<template>
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl">Rate The Raunt</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<SignOutButton v-if="isSignedIn" v-slot="{handler}">
					<button @click="handler" class="btn btn-secondary">Sign Out</button>
				</SignOutButton>
				<SignInButton v-if="!isSignedIn" v-slot="{handler}">
					<button @click="handler" class="btn btn-secondary">Sign in</button>
				</SignInButton>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import {SignOutButton, SignInButton, useAuth, useSession, useUser} from 'vue-clerk';
	const {getToken} = useAuth;
	const {isLoaded, isSignedIn, user} = useUser();
</script>

<style lang="scss" scoped></style>
