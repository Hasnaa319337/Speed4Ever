<template>
  <div>
    <HeadCard />

    <v-container style="width: 68%; margin: auto">
      <v-row style="column-gap: 28px">
        <div
          cols="12"
          lg="4"
          md="6"
          xs="12"
          v-for="product in products"
          :key="product.id"
        >
          <div class="product_card">
            <router-link
              :to="{
                name: 'ProductDetails',
                params: { id: product.id },
              }"
            >
              <img
                :src="product.main_image"
                :alt="product.name"
                width="250"
                height="380"
                class="main_image"
              />
            </router-link>
            <div class="product_details">
              <h4 class="product_name">{{ product.name }}</h4>
              <h5 class="brand_name">{{ product.category.name }}</h5>
              <div class="price_and_btns">
                <div class="product_price">
                  <h5 class="price_without_sale">
                    <span class="price">{{ product.product_price }} </span>
                    <span class="currency">{{ $t("misc.AED") }}</span>
                  </h5>
                </div>
                <div class="card_btns">
                  <v-list
                    v-if="showShare"
                    style="
                      position: absolute;
                      z-index: 10;
                      background: none;
                      transition: 0.3s all ease-in-out;
                    "
                  >
                    <v-list-item>
                      <ShareNetwork
                        network="facebook"
                        url="https://news.vuejs.org/issues/180"
                        hashtags="vuejs,vite"
                      >
                        <v-icon icon="mdi-facebook"></v-icon>
                      </ShareNetwork>
                    </v-list-item>

                    <v-list-item>
                      <ShareNetwork
                        network="twitter"
                        url="https://news.vuejs.org/issues/180"
                        hashtags="vuejs,vite"
                      >
                        <v-icon icon="mdi-twitter"></v-icon>
                      </ShareNetwork>
                    </v-list-item>

                    <v-list-item>
                      <ShareNetwork
                        network="facebook"
                        url="https://news.vuejs.org/issues/180"
                        hashtags="vuejs,vite"
                      >
                        <v-icon icon="mdi-instagram"></v-icon>
                      </ShareNetwork>
                    </v-list-item>
                  </v-list>
                  <button class="share_btn" @click="showShareMethod">
                    <v-icon icon="mdi-share-variant" />
                  </button>

                  <!-- Start:: Wishlist Button  -->

                  <!-- <button class="wishlist_btn" >
                      <img
                        src="@/assets/icons/wishlist-1.png"
                        alt=""
                        v-if="not_fav"
                        @click="change_fav"
                       
                      />
                    </button>
                    <button class="wishlist_btn" > -->
                  <v-icon icon="mdi-heart-outline" />

                  <!-- <img
                        src="@/assets/icons/wishlist-2.png"
                        alt=""
                        v-if="is_fav"
                        @click="change_fav"
                  />
                    </button> -->

                  <!-- End::Wishlist Button -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeadCard from "../HeadCard.vue";

export default {
  components: { HeadCard },
  data() {
    return {
      products: null,
      is_fav: false,
      not_fav: true,
    };
  },

  methods: {
    latest_auctions() {
      this.axios({
        method: "GET",
        url: "latest-products?page=1",
      })
        .then((res) => {
          this.products = res.data.data;
          console.log(this.auctions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    change_fav() {
      this.is_fav = !this.is_fav;
      this.not_fav = !this.not_fav;
    },
  },
  mounted() {
    this.latest_auctions();
  },
};
</script>

<style scoped lang="scss">
.wishlist_btn {
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
