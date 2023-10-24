import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import axios from 'axios';
import bodyParser from 'koa-bodyparser';
import supabase from './subapase.js';

const app = new Koa();
const router = new Router();
const port = 4000;

app.use(cors());
app.use(bodyParser());

router.get('/', async (ctx) => {
    ctx.body = 'test';
});

router.get('/search', async (ctx) => {
    const {name} = ctx.request.query;

    if (name) {
        try {
            const {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyCH6Og5niHx0mLXTNh0RGCuWGiiO7E8DaE`);
            if (data) {
                ctx.body = data;
            } else {
                ctx.body = false;
            }
        } catch (error) {
            console.log('🚀 ~ file: index.ts:15 ~ router.post ~ error:', error);
            ctx.body = error;
        }
    }
});

const generateGoogleLinkAddress = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

router.get('/all', async (ctx) => {
    try {
        const {data: allRestaurants, error} = await supabase.from('restaurants').select('*');

        const data = allRestaurants.map((item) => {
            const addressLink = generateGoogleLinkAddress(item.latitude, item.longitude);
            const typeOfRestaurant = item.types.split(',');
            delete item.types;
            delete item.photos;
            return {
                ...item,
                addressLink,
                typeOfRestaurant,
            };
        });
        if (!data) {
            ctx.body = false;
        }
        ctx.body = data;
    } catch (error) {
        console.log('🚀 ~ file: index.ts:34 ~ router.get ~ error:', error);
        ctx.body = error;
    }
});

// save in database function
router.post('/save', async (ctx) => {
    try {
        const data = await ctx.request.body;
        if (Object.keys(data).length > 0) {
            const record = {
                business_status: data.business_status,
                formatted_address: data.formatted_address,
                latitude: data.geometry.location.lat,
                longitude: data.geometry.location.lng,
                icon_url: data.icon,
                icon_background_color: data.icon_background_color,
                icon_mask_base_uri: data.icon_mask_base_uri,
                name: data.name,
                place_id: data.place_id,
                price_level: data.price_level,
                reference: data.reference,
                types: JSON.stringify(data.types),
                user_ratings_total: data.user_ratings_total,
                rating: data.rating,
                photos: '',
                filter_type: data.filter_type,
            };

            const {error} = await supabase.from('restaurants').insert(record);

            if (error) {
                ctx.body = false;
            } else {
                ctx.body = true;
            }
        }
    } catch (error) {
        console.log('🚀 ~ file: index.ts:107 ~ router.post ~ error:', error);
        ctx.body = false;
    }
});

router.delete('/delete', async (ctx) => {
    const id = ctx.request.query.id;

    const {data: restaurants, error} = await supabase.from('restaurants').select('*').eq('id', id);

    if (restaurants.length > 0) {
        const {error} = await supabase.from('restaurants').delete().eq('id', id);
        if (error) {
            ctx.body = false;
        }
        ctx.body = true;
    } else {
        ctx.body = false;
    }
});

// update rating and comment of restaurant
router.put('/update', async (ctx) => {
    const {id} = ctx.request.query;
    console.log('🚀 ~ file: app.js:129 ~ router.put ~ id:', id);
    const data = await ctx.request.body;

    if (!data) {
        ctx.body = false;
    }
    const {data: res, error} = await supabase.from('restaurants').select().eq('id', id);

    if (res) {
        try {
            const dataToUpdate = {
                valyas_rating: data.valyasRating,
                jonathans_rating: data.jonathansRating,
                jonathan_review: data.jonathansReview,
                valya_review: data.valyasReview,
                filter_type: data.filterType,
            };
            const {error} = await supabase.from('restaurants').update(dataToUpdate).eq('id', id);
            if (error) {
                ctx.body = false;
            }
            ctx.body = true;
        } catch (error) {
            console.log(error);
            ctx.body = false;
        }
    }
});

router.get('/filter', async (ctx) => {
    const {filterType} = ctx.request.query;

    if (filterType) {
        if (filterType === 'all') {
            const {data} = await supabase.from('restaurants').select('*');

            if (data) {
                ctx.body = data;
                return;
            } else {
                ctx.body = false;
            }
        }
        try {
            const {data} = await supabase.from('restaurants').select('*').eq('filter_type', filterType);

            if (data) {
                ctx.body = data;
            } else {
                ctx.body = false;
            }
        } catch (error) {
            console.log('🚀 ~ file: index.ts:15 ~ router.post ~ error:', error);
            ctx.body = error;
        }
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
