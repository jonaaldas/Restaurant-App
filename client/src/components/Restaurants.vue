<template>
	<div class="flex flex-wrap m-2me">
		<div v-if="restaurants.length === 0">Sorry no Restaurants</div>
		<div v-else class="sm:w-1/2 md:w-1/3 lg:w-1/3  p-4" v-for="(restaurant, index) in restaurants" :key="index">
			<div class="card w-full bg-base-100 shadow-xl mb-4">
				<figure>
					<img
						src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
						alt="Shoes"
					/>
				</figure>
				<div class="card-body">
					<div class="flex items-center">
						<img class="mr-2" :src="restaurant.icon_url" style="height: 20px; width: 20px" />
						<h1 class="card-title">{{ restaurant.name }}</h1>
					</div>
					<div>
						<span class="mr-1">Filter:</span>
						<div class="badge badge-primary">{{ restaurant.filter_type }}</div>
					</div>
					<span>
						Address:
						<a :href="restaurant.addressLink">{{ restaurant.formatted_address }}</a>
					</span>
					<!-- price level -->
					<div class="flex">
						<span class="pr-2">Price Level:</span>
						<span v-for="n in restaurant.price_level" :key="n">$</span>
					</div>
					<div>
						<span class="pr-2">Type of Restaurant</span>
						<div class="badge badge-secondary mr-3" v-for="n in restaurant.typeOfRestaurant" :key="n">{{ n }}</div>
					</div>
					<div class="card-actions flex flex-col md:hidden lg:block">
						<span>Others Rating</span>
						<star-rating class="flex-wrap" :rating="restaurant.rating" :read-only="true" :round-start-rating="false" :star-size="30" />
						<div v-if="restaurant.jonathans_rating > 0">
							<span>Valya's Rating</span>
							<star-rating class="flex-wrap" :rating="restaurant.jonathans_rating" :read-only="true" :round-start-rating="false" :star-size="30" />
						</div>
						<div v-if="restaurant.valyas_rating > 0">
							<span>Jonathan's Rating</span>
							<star-rating class="flex-wrap" :rating="restaurant.valyas_rating" :read-only="true" :round-start-rating="false" :star-size="30" />
						</div>
					</div>
					<div class="bg-white p-8 rounded shadow-lg md:hidden lg:block">
						<h2 class="text-2xl font-bold mb-6">Review</h2>
						<div class="bg-gray-100 p-4 rounded-lg mb-4" v-if="restaurant.jonathan_review !== 'null'">
							<h3 class="text-xl font-semibold mb-2">Jonathan's Review</h3>
							<p class="text-base text-gray-700">{{ restaurant.jonathan_review }}</p>
						</div>
						<div class="bg-gray-100 p-4 rounded-lg" v-if="restaurant.valya_review !== 'null'">
							<h3 class="text-xl font-semibold mb-2">Valya's Review</h3>
							<p class="text-base text-gray-700">{{ restaurant.valya_review }}</p>
						</div>
					</div>
					<div>
						<button class="btn btn-secondary bg-base-200" @click="openModal(restaurants[index])">Add Rating</button>
					</div>
				</div>
			</div>
		</div>

		<Restaurant v-if="showModal" :restaurant="selectedRestaurant" @modal="handleModal" />
	</div>
</template>

<script>
	import axios from 'axios';
	import StarRating from 'vue-star-rating';
	import Restaurant from './Restaurant.vue';
	import {mapActions, mapState} from 'vuex';
	const serverURL = import.meta.env.VITE_SERVER_URL;

	export default {
		components: {
			StarRating,
			Restaurant
		},
		data() {
			return {
				showModal: false,
				selectedRestaurant: null,
				deferredPrompt: null
			};
		},
		methods: {
			...mapActions(['fetchRestaurants']),
			openModal(selectedRestaurant) {
				this.showModal = true;
				this.selectedRestaurant = selectedRestaurant;
			},
			handleModal(newModalState) {
				this.showModal = newModalState;
			},
			async deleteRestaurant(id) {
				try {
					const {data} = await axios.delete(`${serverURL}delete?id=${id}`);
					if (data) {
						this.$toast.success('Successfully deleted');
						this.fetchRestaurants();
					}
				} catch (error) {
					this.$toast.error('Something went wrong');
					console.log('🚀 ~ file: Restaurants.vue:107 ~ deleteRestaurant ~ error:', error);
				}
			},
			async installPWA() {
				// Show your customized install prompt for your PWA
				// Your own UI doesn't have to be a single element, you
				// can have buttons in different locations, or wait to prompt
				// as part of a critical journey.

				// deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
				// this.deferredPrompt.prompt();
				console.log(this.deferredPrompt);
				// Find out whether the user confirmed the installation or not
				const {outcome} = await this.deferredPrompt.userChoice;
				// The deferredPrompt can only be used once.
				this.deferredPrompt = null;
				// Act on the user's choice
				if (outcome === 'accepted') {
					console.log('User accepted the install prompt.');
				} else if (outcome === 'dismissed') {
					console.log('User dismissed the install prompt');
				}
			}
		},
		computed: {
			...mapState(['restaurants'])
		},
		mounted() {
			this.fetchRestaurants();
			window.addEventListener('beforeinstallprompt', async e => {
				console.log(e);
				// Prevents the default mini-infobar or install dialog from appearing on mobile
				// e.preventDefault();
				// Save the event because you'll need to trigger it later.
				this.deferredPrompt = e;
			});
		},
		watch: {
			showModal(newModalState) {
				if (!newModalState) {
					this.selectedRestaurant = null;
					this.fetchRestaurants();
				}
			}
		}
	};
</script>

<style scoped></style>
