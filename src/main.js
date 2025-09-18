import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { loadFonts } from './plugins/webfontloader'

// Pinia for state management
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

//api login google
import vue3GoogleLogin from "vue3-google-login";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // ไปเอา Client ID มาใส่
const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID; // เพิ่ม Facebook App ID

// Initialize Facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId: FACEBOOK_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v18.0'
  });
  
  FB.AppEvents.logPageView();
};

// Load Facebook SDK
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// loadFonts()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);


app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CLIENT_ID,
});

app.mount("#app");
