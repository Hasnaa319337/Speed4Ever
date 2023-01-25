<template>
  <div class="product_card">
    <router-link
      :to="{
        name: 'ProductDetails',
        params: { id: related_product.id },
      }"
    >
      <img
        :src="related_product.main_image"
        :alt="image"
        width="250"
        height="380"
      />
    </router-link>
    <div class="product_details">
      <h4 class="product_name">
        {{ related_product.name }}
      </h4>
      <h5 class="brand_name">
        {{ related_product.category.name }}
      </h5>
      <div class="price_and_btns">
        <div class="product_price">
          <h5 class="price_without_sale">
            <span class="price">{{ related_product.product_price }} </span>
            <span class="currency">{{ $t("misc.AED") }}</span>
          </h5>
        </div>
        <div class="card_btns">
          <button class="share_btn">
            <v-icon icon="mdi-share-variant" />
          </button>
          <button class="wishlist_btn" v-if="currentUser.token">
            <v-icon icon="mdi-cards-heart-outline" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["related_product"],
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },
};
</script>

<style></style>
