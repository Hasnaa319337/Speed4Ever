<template>
  <div>
    <HeadCard />

    <v-container>
      <v-row style="column-gap: 28px">
        <div
          cols="12"
          lg="4"
          md="6"
          xs="12"
          v-for="product in products"
          :key="product.id"
        >
          <div class="big_image">
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
                    <button class="share_btn">
                      <v-icon icon="mdi-share-variant" />
                    </button>

                    <!-- Start:: Wishlist Button -->

                    <button
                      class="wishlist_btn"
                      v-if="currentUser.token"
                      @click="addToWishlist(product.id)"
                    >
                      <img
                        src="../../assets/icons/wishlist-3.png"
                        alt=""
                        class="heart_img"
                        v-if="!product.is_fav"
                      />
                      <img
                        src="../../assets/icons/wishlist-2.png"
                        alt=""
                        class="heart_img"
                        v-else
                      />
                      <!-- <v-icon fill="red" icon="mdi-cards-heart-outline" :class="'color: '+ (product.is_fav === true) ? 'red':'green' " /> -->
                    </button>

                    <!-- End: Wishlist Button -->
                  </div>
                </div>

                <!-- Start:: Acutions section -->

                <div class="acutions">
                  <div class="acution_time">
                    <v-icon icon="mdi-clock-time-four-outline" class="  " />
                    <!-- 
                      <vue-countdown
                        :time="product.time_remaining.day"
                        v-slot="{ days, hours, minutes }"
                      >
                        {{ days }} ي : {{ hours }} س : {{ minutes }} د
                      </vue-countdown> -->
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
                      <span class="price">{{ product.product_price }} </span>
                      <span class="currency">{{ $t("misc.AED") }}</span>
                    </span>
                  </div>
                </div>
                <!-- End:: Acutions section -->
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
import { mapGetters } from "vuex";
export default {
  components: { HeadCard },
  data() {
    return {
      products: null,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },
  methods: {
    latest_products() {
      this.axios({
        method: "GET",
        url: "latest-auctions?page=1",
      })
        .then((res) => {
          this.products = res.data.data;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
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
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
  },
  mounted() {
    this.latest_products();
  },
};
</script>
<style lang="scss">
.acutions {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  flex-wrap: wrap;
  font-size: 16px;
  color: #313131;

  .acution_time,
  .number,
  .money {
    display: flex;
    align-items: center;
    justify-content: center;

    column-gap: 8px;
  }
}
.acution_time {
  width: 100% !important;
  margin: 15px 0;
  font-family: Cairo-SemiBold;
}
</style>
