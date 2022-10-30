import { createApp } from 'vue';
import './style.css';
import mitt from 'mitt';
import App from './App.vue';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.mount('#app');
