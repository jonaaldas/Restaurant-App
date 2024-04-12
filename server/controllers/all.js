import supabase from '../subapase.js';

const generateGoogleLinkAddress = (lat, lng) => {
	return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

export default async ctx => {
	try {
		const {data: allRestaurants, error} = await supabase.from('restaurants').select('*');

		if (!allRestaurants) {
			ctx.body = [];
			return;
		}

		const data = allRestaurants.map(item => {
			const addressLink = generateGoogleLinkAddress(item.latitude, item.longitude);
			let typeOfRestaurant;
			try {
				typeOfRestaurant = JSON.parse(item.types);
			} catch (error) {
				console.log(error);
				typeOfRestaurant = item.types;
			}
			delete item.types;
			delete item.photos;
			return {
				...item,
				addressLink,
				typeOfRestaurant
			};
		});

		ctx.body = data;
	} catch (error) {
		console.log('🚀 ~ file: index.ts:34 ~ router.get ~ error:', error);
		ctx.body = error;
	}
};
