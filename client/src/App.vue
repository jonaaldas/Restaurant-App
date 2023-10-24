<template>
    <div>
        <NavigationBar />
        <Search />
        <Example />
        <Restaurants />
    </div>
</template>

<script>
    import './assets/tailwind.css';
    import NavigationBar from './components/NavigationBar.vue';
    import Search from './components/Search.vue';
    import Restaurants from './components/Restaurants.vue';
    import Example from './components/Example.vue';

    export default {
        components: {
            NavigationBar,
            Search,
            Restaurants,
            Example,
        },
    };
</script>

<style scoped></style>
