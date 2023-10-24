<template>
    <div>
        <NavigationBar />
        <Search />
        <Filter />
        <Restaurants />
    </div>
</template>

<script>
    import './assets/tailwind.css';
    import NavigationBar from './components/NavigationBar.vue';
    import Search from './components/Search.vue';
    import Restaurants from './components/Restaurants.vue';
    import Filter from './components/Filter.vue';

    export default {
        components: {
            NavigationBar,
            Search,
            Restaurants,
            Filter,
        },
    };
</script>

<style scoped></style>
