import supabase from '../subapase.js';
import axios from 'axios';

export default async (ctx) => {
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
};
