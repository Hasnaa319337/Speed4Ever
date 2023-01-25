<template>
  <div>
    <HeadCard />

    <v-container>
      <EmptyCard v-if="!products.length" />
      <v-row v-if="products.length" style="    column-gap: 30px;">
        <div cols="12" lg="4" md="6" xs="12" v-for="product in products" :key="product.id">
          <NewCard :product="product"/>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EmptyCard from "@/components/EmptyCard.vue";
import HeadCard from "@/components/HeadCard.vue";
import NewCard from "@/components/acutions/NewCard.vue";

export default {
  components: { HeadCard, EmptyCard,NewCard },

  data() {
    return {
      products: [],
    };
  },
  methods: {
    getMyAds() {
      this.axios({
        method: "GET",
        url: "product",
      })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getMyAds();
  },
};
</script>

<style></style>
