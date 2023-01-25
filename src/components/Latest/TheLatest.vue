<template>
  <div>
    <v-container class="my_container">
      <div class="heading_div">
        <h3 class="heading">{{ $t("headers.lastes") }}</h3>
      </div>
      <Carousel
      :breakpoints="breakpoints"
        :wrap-around="true"
        :autoplay="1"
        :transition="3000"
      >
        <Slide v-for="product in auctions" :key="product.id">
          <div class="carousel__item big_image">
            <ProductCard :product="product" />
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <!-- direction rtl -->
      <router-link
        to="/all_acutions"
        class="main_btn"
        v-if="$i18n.locale == 'ar'"
      >
        <span>{{ $t("buttons.see all") }}</span>
        <span> <v-icon icon="mdi-arrow-left-thin" /></span>
      </router-link>

      <!-- dirction ltr -->
      <router-link to="/all_acutions" class="main_btn" v-else>
        <span> <v-icon icon="mdi-arrow-right-thin" /></span>
        <span>{{ $t("buttons.see all") }}</span>
      </router-link>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import ProductCard from "../products/ProductCard.vue";

export default defineComponent({
  name: "WrapAround",

  components: {
    Carousel,
    Slide,
    Navigation,
    ProductCard,
  },
  props:['auctions'],
  data() {
    return {
      router_link: " عرض الكل",
      link_to: "/all_Latests",

      breakpoints: {
				// 700px and up
				900: {
					itemsToShow: 3,
					snapAlign: "center"
				},
				// 1024 and up
			
        1260: {
					itemsToShow: 3,
					snapAlign: "start"
				},
        750: {
					itemsToShow: 2,
					snapAlign: "start"
				},
			}
    };
  },

  methods: {

  },

});
</script>

<style lang="scss">




@media (max-width: 1090px) {
}
</style>
