import supabase from '../subapase.js';

export default async (ctx) => {
    const {id} = ctx.request.query;

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
};
