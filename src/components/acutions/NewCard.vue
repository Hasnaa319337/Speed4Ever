<template>
  <div>
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
               class="auction_social_btns"
               v-if="showShare"
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

            <!-- Start:: Wishlist Button -->
            <button class="wishlist_btn" v-if="currentUser.token">
              <img
                src="@/assets/icons/wishlist-1.png"
                alt=""
                v-if="not_fav"
                class="heart_img"
                @click="addToWishlist(product.id)"
              />
            </button>
            <button class="wishlist_btn">
              <img
                src="@/assets/icons/wishlist-2.png"
                alt=""
                v-if="is_fav"
                class="heart_img"
                @click="removeFromWishlist(product.id)"
              />
            </button>

            <!-- End: Wishlist Button -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["product"],
  data() {
    return {
      is_fav: false,
      not_fav: true,
      showShare: false,
    };
  },
  
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },
  methods: {
     showShareMethod() {
      this.showShare = !this.showShare;
    },
    addToWishlist(product_id) {
      const form = new FormData();
      form.append("product_id", product_id);
      this.axios({
        method: "POST",
        url: "add-to-fav",
        data: form,
      })
        .then(() => {
          this.$toast.success(`added Successfully`);
          this.is_fav = !this.is_fav;
          this.not_fav = !this.not_fav;
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    removeFromWishlist(product_id) {
      const form = new FormData();
      form.append("product_id", product_id);
      this.axios({
        method: "POST",
        url: "add-to-fav",
        data: form,
      })
        .then(() => {
          this.$toast.success(`Removed Successfully`);
          this.is_fav = !this.is_fav;
          this.not_fav = !this.not_fav;
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
  },
};
</script>

<style></style>
