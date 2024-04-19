<template>
	<div class="container m-auto">
		<div v-if="!isSignedIn">
			The the Raunt
		</div>
		<SignedIn>
			<Search />
			<Filter />
			<Restaurants />
			<Footer />
		</SignedIn>
	</div>
</template>

<script setup>
	import Search from '../components/Search.vue';
	import Restaurants from '../components/Restaurants.vue';
	import Filter from '../components/Filter.vue';
	import Footer from '../components/Footer.vue';
	import {SignedIn, useSession} from 'vue-clerk';
	const {isSignedIn} = useSession();
</script>

<style scoped></style>
