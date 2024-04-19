<template>
	<NavBar />
	<ClerkLoaded>
		<RouterView />
	</ClerkLoaded>
</template>

<script setup>
	import './assets/tailwind.css';
	import {ClerkLoaded} from 'vue-clerk';
	import NavBar from './components/NavBar.vue';
</script>

<style scoped></style>
