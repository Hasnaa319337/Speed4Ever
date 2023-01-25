<template>
  <div>
    <HeadCard />
    <v-container class="my_container">
      <div>
        <!--Start:: Empty Search -->
        <EmptyCard  v-if="!results.length" :text="$t('misc.noSearch')"/>
        <!--End:: Empty Search -->

        <!-- Start:: Search Results -->
        <v-row style="column-gap: 28px" v-if="results.length">
          <div
            cols="12"
            lg="3"
            md="6"
            xs="12"
            v-for="product in results"
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
                    <button class="wishlist_btn" >
                    <img
                      src="@/assets/icons/wishlist-1.png"
                      alt=""
                      v-if="not_fav"
                      @click="addToWishlist(product.id)"
                      class="heart_img"
                    />
                  </button>
                  <button class="wishlist_btn">
                  
                    <img
                      src="@/assets/icons/wishlist-2.png"
                      alt=""
                      v-if="is_fav"
                      @click="removeFromWishlist(product.id)"
                      class="heart_img"
                    />
                  </button>
                    <!-- End::Wishlist Button -->
                  </div>
                </div>

                <!-- Start:: Acutions section -->
                <div class="acutions" v-if="product.auction_id != null">
                  <div class="acution_time">
                    <v-icon icon="mdi-clock-time-four-outline" class="  " />

                    <vue-countdown
                      :time="product.time_remaining.day"
                      v-slot="{ days, hours, minutes }"
                    >
                      {{ days }} ي : {{ hours }} س : {{ minutes }} د
                    </vue-countdown>
                  </div>
                  <div class="number">
                    <span class="acution_icon"
                      ><v-icon icon="mdi-gavel"
                    /></span>
                    <span class="acution_number">{{ product.qty }}</span>
                  </div>
                  <div class="money">
                    <span class="money_icon"><v-icon icon="mdi-cash" /></span>
                    <span class="money_value">
                      <span class="price">500 </span>
                      <span class="currency">{{ $t("misc.AED") }}</span>
                    </span>
                  </div>
                </div>

                <!-- End:: Acutions section -->
              </div>
            </div>
          </div>
        </v-row>
        <!-- End:: Search Results -->
      </div>
    </v-container>
  </div>
</template>

<script>
import EmptyCard from "@/components/EmptyCard.vue";
import HeadCard from "@/components/HeadCard.vue";

export default {
  components: { HeadCard, EmptyCard },
  computed: {
    results() {
      return this.$store.state.results;
    },
  },
  data() {
    return {
      showShare: false,
      is_fav: false,
      not_fav: true,
    };
  },
  methods:{
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
  }
};
</script>

<style></style>
