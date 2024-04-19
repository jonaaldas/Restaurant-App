<script setup>
	import {SignIn} from 'vue-clerk';
</script>

<template>
	<SignIn path="/login" routing="path" sign-up-url="/sign-up" redirectUrl="/" />
</template>
