import axios from 'axios';
import {createStore} from 'vuex';
const serverUrl = 'https://rate-the-raunt.onrender.com/';
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
                // const {data} = await axios.get('http://localhost:4000/all');
                const {data} = await axios.get(`${serverUrl}all`);

                commit('setItems', data);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        },
        async filter({commit}, filterType) {
            try {
                // const {data} = await axios.get(`http://localhost:4000/filter?filterType=${filterType}`);
                const {data} = await axios.get(`${serverUrl}filter?filterType=${filterType}`);

                commit('addItem', data);
            } catch (error) {
                console.error('An error occurred while creating an item:', error);
            }
        },
    },
});
