import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store2 from './store2';
import 'animate.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(store2);
app.use(VueSweetalert2);

app.mount('#app');
