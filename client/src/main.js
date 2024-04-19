import {createApp} from 'vue';
import App from './App.vue';
import restaurantStore from './store/restaurantStore';
import './assets/tailwind.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './service-worker';
import {clerkPlugin} from 'vue-clerk/plugin';
import router from './router';
const app = createApp(App);

app.use(restaurantStore);
app.use(ToastPlugin);
app.use(clerkPlugin, {
	publishableKey: 'pk_test_a25vd2luZy1waWdsZXQtMC5jbGVyay5hY2NvdW50cy5kZXYk'
});
app.use(router);
app.mount('#app');
