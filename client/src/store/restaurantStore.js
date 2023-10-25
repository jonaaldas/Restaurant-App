import axios from 'axios';
import {createStore} from 'vuex';
const serverURL = import.meta.env.VITE_SERVER_URL;
console.log('🚀 ~ file: restaurantStore.js:4 ~ serverURL:', serverURL);
export default createStore({
    state: {
        restaurants: [],
    },
    mutations: {
        setItems(state, items) {
            state.restaurants = items;
        },
        addItem(state, item) {
            state.restaurants = item;
        },
    },
    actions: {
        async fetchRestaurants({commit}) {
            try {
                const {data} = await axios.get(`${serverURL}all`);

                commit('setItems', data);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        },
        async filter({commit}, filterType) {
            try {
                const {data} = await axios.get(`${serverURL}filter?filterType=${filterType}`);

                commit('addItem', data);
            } catch (error) {
                console.error('An error occurred while creating an item:', error);
            }
        },
    },
});
