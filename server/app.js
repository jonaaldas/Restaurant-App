import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import axios from 'axios';
import bodyParser from 'koa-bodyparser';
import queryDB from './planetScale.js';

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
    console.log('🚀 ~ file: router.js:19 ~ router.get ~ name:', name);

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
        const res = await queryDB('SELECT * FROM restaurants');
        const data = res.rows.map((item) => {
            // const photos = JSON.parse(item.photos);
            // const photoRefrence = photos[0].photo_reference;
            // const photoLink = createGooglePhotoLink(photoRefrence);
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
            const query = `
        INSERT INTO restaurants (
            business_status,
            formatted_address,
            latitude,
            longitude,
            icon_url,
            icon_background_color,
            icon_mask_base_uri,
            name,
            place_id,
            price_level,
            reference,
            types,
            user_ratings_total,
            rating,
            photos,
            filter_type
        )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
            const values = [
                data.business_status,
                data.formatted_address,
                data.geometry.location.lat,
                data.geometry.location.lng,
                data.icon,
                data.icon_background_color,
                data.icon_mask_base_uri,
                data.name,
                data.place_id,
                data.price_level,
                data.reference,
                JSON.stringify(data.types),
                data.user_ratings_total,
                data.rating,
                '',
                data.filter_type,
            ];

            const result = await queryDB(query, values);

            if (result.affectedRows > 0) {
                ctx.body = true;
            } else {
                ctx.body = false;
            }
        }
    } catch (error) {
        console.log('🚀 ~ file: index.ts:107 ~ router.post ~ error:', error);
        ctx.body = false;
    }
});

router.delete('/delete', async (ctx) => {
    const id = ctx.request.query.id;
    const getRestaurant = await queryDB(`SELECT * FROM restaurants WHERE id = '${id}'`);
    if (getRestaurant.rows.length > 0) {
        await queryDB(`DELETE FROM restaurants WHERE id = '${id}'`);
        ctx.body = true;
    } else {
        ctx.body = false;
    }
});

// update rating and comment of restaurant
router.put('/update', async (ctx) => {
    const {id} = ctx.request.query;
    const data = await ctx.request.body;
    console.log('🚀 ~ file: index.ts:118 ~ router.put ~ data:', data);
    if (!data) {
        ctx.body = false;
    }
    const res = await queryDB(`SELECT * FROM restaurants WHERE id = '${id}'`);

    if (res) {
        try {
            await queryDB(
                `UPDATE restaurants SET valyas_rating = ${data.valyasRating}, jonathans_rating = ${data.jonathansRating}, jonathan_review = '${data.jonathansReview}', valya_review = '${data.valyasReview}', filter_type = '${data.filterType}'
                WHERE id = ${id}`
            );
            ctx.body = true;
        } catch (error) {
            console.log(error);
            ctx.body = false;
        }
    }
});

// app.use(router.routes()).use(router.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
