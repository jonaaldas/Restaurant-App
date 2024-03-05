<template>
	<div class="container m-auto">
		<NavigationBar />
		<Search />
		<Filter />
		<Restaurants />
		<Footer />
	</div>
</template>

<script lnag="ts">
	import './assets/tailwind.css';
	import NavigationBar from './components/NavigationBar.vue';
	import Search from './components/Search.vue';
	import Restaurants from './components/Restaurants.vue';
	import Filter from './components/Filter.vue';
	import Footer from './components/Footer.vue';

	export default {
		components: {
			NavigationBar,
			Search,
			Restaurants,
			Filter,
			Footer
		}
	};
</script>

<style scoped></style>
