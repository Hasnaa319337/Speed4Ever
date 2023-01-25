<template v-if="dataFetched">
  <div>
    <HeadCard />

    <v-container class="my_container">
      <v-row style="column-gap: 35px">
        <div
          cols="12"
          lg="4"
          md="6"
          xs="12"
          v-for="product in products"
          :key="product.id"
        >
          <div class="product_card">
            <router-link to="/">
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
                  <button class="share_btn">
                    <v-icon icon="mdi-share-variant" />
                  </button>
                  <button class="wishlist_btn" v-if="currentUser.token">
                    <!-- <v-icon
                      fill="red"
                      icon="mdi-cards-heart-outline"
                      :class="
                        'color: ' + (product.is_fav === true) ? 'red' : 'green'
                      "
                    /> -->
                   
                    <img
                      src="../../assets/icons/wishlist-2.png"
                      alt=""
                      class="heart_img"
                   
                      
                    />
                  </button>
                </div>
              </div>

              <!-- Start:: Acutions section -->
              <div class="acutions" v-if="product.auction_id">
                <div class="acution_time">
                  <v-icon icon="mdi-clock-time-four-outline" class="  " />

                  <!-- <vue-countdown
                  :time="product.time_remaining.day"
                  v-slot="{ days, hours, minutes }"
                >
                  {{ days }} ي : {{ hours }} س : {{ minutes }} د
                </vue-countdown> -->
                </div>
                <div class="number">
                  <span class="acution_icon"><v-icon icon="mdi-gavel" /></span>
                  <span class="acution_number">{{ product.qty }}</span>
                </div>
                <div class="money">
                  <span class="money_icon"><v-icon icon="mdi-cash" /></span>
                  <span class="money_value">
                    <span class="price">{{ product.last_bid_price }} </span>
                    <span class="currency">{{ $t("misc.AED") }}</span>
                  </span>
                </div>
              </div>

              <!-- End:: Acutions section -->
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeadCard from "@/components/HeadCard.vue";

import { mapGetters } from "vuex";
export default {
  props: ["product"],
  components: { HeadCard },
  data() {
    return {
      products: null,
      dataFetched: false,

    };
  },
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },
  mounted() {
    this.getWishlist();
  },
  methods: {
    getWishlist() {
      this.axios({
        method: "GET",
        url: "myFavourites",
      })
        .then((res) => {
          this.products = res.data.data;
          this.dataFetched = true;
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
  },

};
</script>

<style></style>
