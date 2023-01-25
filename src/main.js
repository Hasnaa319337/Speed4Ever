import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// import Cookies from "js-cookie";
// font

import "@/assets/main.css";

//share
import VueSocialSharing from "vue-social-sharing";

// chat
import Chat from "vue3-beautiful-chat";

// animation
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

//bootstrap
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//countdown

import VueCountdown from "@chenfengyuan/vue-countdown";

//multi select
import "@vueform/multiselect/themes/default.css"

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

//axios

import axios from "axios";
import VueAxios from "vue-axios";
axios.defaults.baseURL = "https://back.speed4ever.com/app/";
// console.log(localStorage.getItem('speed_app_user_token'))

// axios.defaults.headers.common['Authorization'] = `Bearer `

axios.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem("speed_app_user_token")}`,
  Accept: "application/json",
  "Accept-Language": i18n.global.locale,
};

//toast

import Toaster from "@meforma/vue-toaster";

//otp
import VOtpInput from "vue3-otp-input";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import i18n from "./i18n";

//primeVue
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Sidebar from 'primevue/sidebar';
import Paginator from 'primevue/paginator';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(vuetify);
app.component(VueCountdown.name, VueCountdown);
// app.use(VueSocialSharing);
app.component("v-otp-input", VOtpInput);
app.use(PrimeVue);

app.component("ButtonComp", Button);
app.component("SidebarComp", Sidebar);
app.component("PaginatorComp", Paginator);

app.use(VueAxios, axios);

app.use(VueSocialSharing);
app.use(Chat);
app.use(bootstrap);


app.use(Toaster, {
  position: "bottom-right",
});
app.use(VueAwesomePaginate);
app.mount("#app");
