<template>
  <div class="home">
    <the-carsoual :slider="slider" />
    <WhoUs />
    <CatgoriesHome :categories="categories"/>
    <TheLatest :auctions="auctions" v-if="auctions.length > 0" />
    <AcutionsCard :products="products" />
    <LoadingComponet v-if="pageLoading" />
  </div>
</template>

<script>
import AcutionsCard from "@/components/acutions/AcutionsCard.vue";
import TheLatest from "@/components/Latest/TheLatest.vue";
import WhoUs from "@/components/WhoUs.vue";
import TheCarsoual from "@/ui/TheCarsoual";
import CatgoriesHome from "../components/categories/CatgoriesHome.vue";
import LoadingComponet from "@/components/loadingComponet.vue";
import store from "@/store";

export default {
  name: "HomeView",
  components: {
    TheCarsoual,
    WhoUs,
    CatgoriesHome,
    TheLatest,
    AcutionsCard,
    LoadingComponet,
  },
  data() {
    return {
      auctions: [],
      products: [],
      slider: null,
    };
  },

  computed: {
    pageLoading() {
      return store.getters.pageLoading;
    },
  },
  methods: {
    getHome() {
      store.commit("pageLoading", true);
      this.axios({
        method: "GET",
        url: "home",
      })
        .then((res) => {
         
          this.slider = res.data.data.slider;
          this.categories= res.data.data.categories;
          this.auctions = res.data.data.latest_auctions;
          this.products = res.data.data.latest_products;

          setTimeout(()=>{
            store.commit("pageLoading", false);
          },5500)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getHome();
  },
};
</script>
