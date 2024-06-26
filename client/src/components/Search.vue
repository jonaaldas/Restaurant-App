<template>
	<div class="relative flex m-2 justify-center">
		<input type="text" placeholder="Search for restaurant" class="input input-bordered w-full mr-1" v-model="searchString" />

		<button class="btn btn-primary search mr-3" @click="search">Search</button>

		<div class="absolute z-50 mt-12 w-full bg-white border border-gray-300 rounded-md shadow-lg" v-show="showDropDown">
			<button class="absolute right-2 text-gray-500 hover:text-gray-800 z-30" @click="closeDropdown">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
			<ul>
				<li class="p-4 hover:bg-gray-200 cursor-pointer" v-for="(result, index) in searchResults" :key="index" @click="save(result)">
					<div class="flex items-center">
						<img :src="result.icon" alt="Restaurant icon" class="w-8 h-8 mr-2" />
						<div>
							<div class="font-semibold">{{ result.name }}</div>
							<div class="text-sm text-gray-500">{{ result.formatted_address }}</div>
						</div>
					</div>

					<div class="mt-2 inline-flex">
						<span class="text-sm text-gray-400 mr-2">Rating:</span>
						<star-rating :rating="result.rating" :star-size="20" :read-only="true" :round-start-rating="false" class="text-xs sm:text-base" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import StarRating from 'vue-star-rating';
	import {mapActions} from 'vuex';
	const serverURL = import.meta.env.VITE_SERVER_URL;
	export default {
		data() {
			return {
				searchString: '',
				searchResults: [],
				showDropDown: false
			};
		},
		components: {
			StarRating
		},
		methods: {
			...mapActions(['fetchRestaurants']),
			async search(e) {
				const isEnterKeyPressed = e.keyCode === 13;
				const isSearchButtonClicked = e.target.classList.contains('search');

				if (this.searchString.length === 0) {
					console.log('Please enter a search term');
					return;
				}

				if (isEnterKeyPressed || isSearchButtonClicked) {
					try {
						const {data} = await axios.get(`${serverURL}search?name=${this.searchString}`);
						if (data.results.length > 0) {
							this.showDropDown = true;
							this.searchResults = data.results;
						} else {
							this.searchResults = [];
							console.log(data.status);
						}
					} catch (error) {
						console.log('🚀 ~ file: Search.vue:58 ~ search ~ error:', error);
						this.showDropDown = false;
					}
				}
			},
			async save(result) {
				const {data} = await axios.post(`${serverURL}save`, result);
				if (data) {
					this.showDropDown = false;
					this.searchString = '';
					this.$toast.success('Restaurant saved successfully');
					this.fetchRestaurants();
				} else {
					console.log('Error saving restaurant');
					this.$toast.error('Error saving restaurant');
				}
			},
			closeDropdown() {
				this.showDropDown = false;
				this.searchString = '';
			}
		},
		created() {
			window.addEventListener('keypress', this.search);
		},
		destroyed() {
			window.removeEventListener('keypress', this.search);
		},
		watch: {
			searchString: {
				handler(value) {
					if (value.length === 0) {
						this.showDropDown = false;
					}
				}
			}
		}
	};
</script>

<style scoped></style>
