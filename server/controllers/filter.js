import supabase from '../subapase.js';

export default async (ctx) => {
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
};
