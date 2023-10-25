import supabase from '../subapase.js';

const generateGoogleLinkAddress = (lat, lng) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

export default async (ctx) => {
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
};
