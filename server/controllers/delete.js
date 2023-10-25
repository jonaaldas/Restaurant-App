import supabase from '../subapase.js';

export default async (ctx) => {
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
};
