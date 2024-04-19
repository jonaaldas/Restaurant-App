<template>
	<div class="w-full flex flex-wrap space-x-3">
		<span class="ml-5 mr-2">Filters:</span>
		<div class="badge cursor-pointer badge-primary p-3 hover:text-gray-800" @click="setFilter('all')">All</div>
		<div class="badge cursor-pointer badge-primary p-3 hover:text-gray-800" @click="setFilter('Fast Food')">Fast Food</div>
		<div class="badge cursor-pointer badge-primary p-3 hover:text-gray-800" @click="setFilter('Fast Dining')">Fast Dining</div>
		<div class="badge cursor-pointer badge-primary p-3 hover:text-gray-800" @click="setFilter('Casual Dining')">Casual Dining</div>
		<div class="badge cursor-pointer badge-primary p-3 hover:text-gray-800" @click="setFilter('Cafe')">Cafe</div>
		<div class="badge cursor-pointer badge-primary p-3 hover:text-gray-800" @click="setFilter('Bar')">Bar</div>
	</div>
</template>
<script>
	import {mapActions} from 'vuex';
	export default {
		data() {
			return {
				selectedFilter: 'all'
			};
		},
		methods: {
			...mapActions(['filter']),
			setFilter(filter) {
				this.selectedFilter = filter;
				this.filter(filter);
			}
		}
	};
</script>
<style></style>
