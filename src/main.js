import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { loadFonts } from './plugins/webfontloader'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

//api login google
import vue3GoogleLogin from 'vue3-google-login'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID // ไปเอา Client ID มาใส่

// loadFonts()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CLIENT_ID
})

app.mount('#app')
