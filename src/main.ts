import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { DatePicker } from 'primevue'
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const CustomTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#E0FAF0', // Lightest shade
      100: '#B3F3DA',
      200: '#80ECC4',
      300: '#4DE5AE',
      400: '#2AD394', // Adjusted primary color
      500: '#4ddfa1',
      600: '#74827c',
      700: '#1D9467',
      800: '#197B58',
      900: '#14634A',
      950: '#0E4534', // Darkest shade
    },
  },
});


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: CustomTheme,
    options: {
      darkModeSelector: '#',
    },
  }
});
app.component('DatePicker', DatePicker);


app.mount('#app')
