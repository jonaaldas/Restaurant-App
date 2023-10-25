import supabase from '../subapase.js';

export default async (ctx) => {
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
};
