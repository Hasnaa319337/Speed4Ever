<template>
  <div>
    <!-- Start:: Buttons -->
    <v-container style="display: flex; justify-content: space-between">
      <div class="filter_content_btns_wrapper">
        <button class="confirm_btn">{{ $t("buttons.all") }}</button>
        <button class="confirm_btn" v-for="btn in subcategory" :key="btn">
          {{ btn.name }}
        </button>
      </div>
      <div class="filter_drawer_toggeler_wrapper">
        <button class="filter_drawer_toggeler">
         
          <span class="text">
            <div class="filter">
              <button class="btn" @click="visibleLeft = true">
                <span class="filter_icon"><v-icon icon="mdi-filter-variant-minus" /></span>
                {{ $t("misc.filter") }}
              </button>

              <SidebarComp
                v-model:visible="visibleLeft"
                :baseZIndex="10000"
                position="right"
              >
                <h5 style="text-align: center; font-size: 30px">
                  {{ $t("misc.filter") }}
                </h5>

                <div class="profile_settings">
                  <v-form @submit.prevent="FilterMethod">
                    <!-- country Options -->

                    <select class="form-select" v-model="filter.country_option">
                      <option selected disabled value="">
                        {{ $t("placeholder.country") }}
                      </option>

                      <option
                        :value="country.id"
                        v-for="country in countires_options"
                        :key="country.id"
                      >
                        {{ country.name }}
                      </option>
                    </select>

                    <!-- shipping method -->
                    <select
                      class="form-select"
                      v-model="filter.shipping_option"
                    >
                      <option selected disabled value="">
                        {{ $t("misc.Shipping Method") }}
                      </option>
                      <option
                        :value="shipping.id"
                        v-for="shipping in shipping_method"
                        :key="shipping.id"
                      >
                        {{ shipping.name }}
                      </option>
                    </select>

                    <!--  -->

                    <select class="form-select" v-model="filter.status_option">
                      <option selected disabled value="">
                        {{ $t("misc.product condition") }}
                      </option>
                      <option
                        :value="status.id"
                        v-for="status in product_status"
                        :key="status.id"
                      >
                        {{ status.name }}
                      </option>
                    </select>
                    <!--  -->
                    <div class="form-control">
                      <v-text>{{ $t("misc.rate") }}</v-text>
                    </div>
                    <v-rating
                      v-model="filter.rating"
                      bg-color="orange-lighten-1"
                      color="blue"
                      hover
                    ></v-rating>
                    <div class="form-control buttons">
                      <button class="confirm_btn" type="submit">
                        {{ $t("buttons.search") }}
                      </button>
                      <button class="confirm_btn" style="" @click="visibleLeft = false">
                        {{ $t("misc.Cancellation") }}
                      </button>
                    </div>
                  </v-form>
                </div>
              </SidebarComp>
            </div>
          </span>
        </button>
      </div>
    </v-container>
    <!-- end:: Buttons -->

    <!-- Start:: Empty Message -->
    <EmptyCard v-if="!allCat.length" />
    <!-- End:: Empty Message -->

    <!-- Start:: Category Content -->
    <div
      class="category_content_wrapper small_screens_container"
      v-if="allCat.length"
    >
      <!--Start:: if all data -->
      <div v-if="allData">
        <v-row style="margin: auto; width: 68%; column-gap: 25px">
          <div cols="12" lg="4" md="6" v-for="cat in allCat" :key="cat.id">
            <div class="product_card">
              <router-link
                :to="{
                  name: 'ProductDetails',
                  params: { id: cat.id },
                }"
                class="product_image"
                ><img width="250" height="380" :src="cat.main_image"
              /></router-link>
              <div class="product_details">
                <h4 class="product_name">
                  <a href="/product-details/193" class="">
                    {{ cat.name }}
                  </a>
                </h4>
                <h5 class="brand_name">{{ cat.category.name }}</h5>

                <div class="price_and_btns">
                  <div class="product_price">
                    <h5 class="price_witout_sale">
                      <span class="price"> {{ cat.product_price }} </span
                      ><span class="currency">{{ $t("misc.AED") }}</span>
                    </h5>
                  </div>

                  <div class="card_btns">
                    <v-list class="auction_social_btns" v-if="showShare">
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
                    <button class="wishlist_btn">
                      <img
                        src="@/assets/icons/wishlist-3.png"
                        alt=""
                        v-if="not_fav"
                        class="heart_img"
                        @click="addToWishlist(cat.id)"
                      />
                    </button>
                    <button class="wishlist_btn">
                      <img
                        class="heart_img"
                        src="@/assets/icons/wishlist-2.png"
                        alt=""
                        v-if="is_fav"
                        @click="removeFromWishlist(cat.id)"
                      />
                    </button>
                    <!-- End::Wishlist Button -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-row>

        <!-- Pagination -->
        <div class="text-center">
          <!-- start:: Pagination  -->
          <PaginatorComp :rows="last_page" :totalRecords="last_page">
            <template>
              Page: {{ cuurent_page }} First: {{ cuurent_page }} Rows:
              {{ last_page }}
            </template>
          </PaginatorComp>
        </div>
        <!-- Pagination -->
      </div>
      <!-- End:: if all data -->

      <!--Start:: if filter data -->
      <div v-if="!allData">
        <v-row style="margin: auto; width: 68%; column-gap: 25px">
          <div
            cols="12"
            lg="4"
            md="6"
            xs="12"
            v-for="cat in filterdProducts"
            :key="cat.id"
          >
            <div class="product_card">
              <router-link
                :to="{
                  name: 'ProductDetails',
                  params: { id: cat.id },
                }"
                class="product_image"
                ><img width="250" height="380" :src="cat.main_image"
              /></router-link>
              <div class="product_details">
                <h4 class="product_name">
                  <a href="/product-details/193" class="">
                    {{ cat.name }}
                  </a>
                </h4>
                <h5 class="brand_name">{{ cat.category.name }}</h5>

                <div class="price_and_btns">
                  <div class="product_price">
                    <h5 class="price_witout_sale">
                      <span class="price"> {{ cat.product_price }} </span
                      ><span class="currency">{{ $t("misc.AED") }}</span>
                    </h5>
                  </div>

                  <div class="card_btns">
                    <button class="share_btn">
                      <v-icon icon="mdi-share-variant" />
                    </button>

                    <!-- Start:: Wishlist Button  -->
                    <button class="wishlist_btn" v-if="currentUser.token">
                      <img
                        src="../../assets/icons/wishlist-3.png"
                        alt=""
                        class="heart_img"
                        v-if="!cat.is_fav"
                        @click="addToWishlist(cat.id)"
                      />
                      <img
                        src="../../assets/icons/wishlist-2.png"
                        alt=""
                        class="heart_img"
                        v-else
                      />
                    </button>
                    <!-- End::Wishlist Button -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-row>

        <EmptyCard v-if="!filterdProducts.length" />
      </div>
      <!-- End:: if filter data -->
    </div>
    <!-- End:: Category Content -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import EmptyCard from "../EmptyCard.vue";

export default {
  components: { EmptyCard },
  data() {
    return {
      is_fav: false,
      not_fav: true,
      showShare: false,
      subcategory: null,
      allCat: [],
      filter_data: null,
      id: this.$route.params.id,
      allData: true,
      visibleLeft: false,
      visibleRight: false,

      filter: {
        country_option: "",
        shipping_option: "",
        status_option: "",
        rating: 0,
      },

      product_status: null,
      shipping_method: null,
      countires_options: null,
      filterdProducts: [],
      prev_page_url: null,
      next_page_url: null,
      last_page: null,
      cuurent_page: null,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },

  methods: {
    getSubCategory() {
      this.axios({
        method: "GET",
        url: `subCategories/${this.id}`,
      })
        .then((res) => {
          this.subcategory = res.data.data;
          console.log(this.subcategory);
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    getAllCat() {
      this.axios({
        method: "GET",
        url: `productsByCategoryId?category_id=${this.id}`,
      })
        .then((res) => {
          this.allCat = res.data.data;
          (this.cuurent_page = res.data.meta.current_page),
            (this.last_page = res.data.meta.last_page),
            (this.next_page_url = res.data.links.next),
            (this.prev_page_url = res.data.links.prev);
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },

    // Start:: method for filter

    FilterMethod() {
      this.axios({
        method: "GET",
        url: "filter",

        params: {
          category_id: this.id,
          shipping_way_id: this.filter.shipping_option,
          product_status_id: this.filter.status_option,
          rating_value: this.filter.rating,
        },
      })
        .then((res) => {
          this.filterdProducts = res.data.data;
          this.allData = false;
        })
        .catch((error) => {
          this.$toast.error(error.data.message);
        });
    },

    productStatus() {
      this.axios({
        method: "GET",
        url: "productStatuses",
      })
        .then((res) => {
          this.product_status = res.data.data;
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    shippingWay() {
      this.axios({
        method: "GET",
        url: "shippingWays",
      })
        .then((res) => {
          this.shipping_method = res.data.data;
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    countires() {
      this.axios({
        method: "GET",
        url: "countries",
      })
        .then((res) => {
          this.countires_options = res.data.data;
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },

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
  // End:: method for filter

  // Start:: Pagination

  // End:: PAgination

  mounted() {
    this.getSubCategory();
    this.getAllCat();
    // this.FilterMethod();
    this.productStatus();
    this.shippingWay();
    this.countires();
  },
};
</script>

<style lang="scss">
/* Start ::style buttons */

.filter_content_btns_wrapper {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  -moz-column-gap: 8px;
  column-gap: 8px;
  row-gap: 8px;
  .confirm_btn {
    border-radius: 3px;
    font-size: 14px;
    padding: 5px;
    height: 37px;
    &:not(:first-child) {
      background: #f7f5ef;
      color: #000000bd !important;
      border: none;
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: #6c98a2;
        border: 2px solid #6c98a2;
        color: #fff !important;
        transition: 0.3s all ease-in-out;
      }
    }
  }
}
.v-form .form-select,
.form-control {
  border: none !important;
  border-bottom: 1px solid rgb(234, 232, 232) !important;
  border-radius: 0 !important;
  margin: 30px 0;
}
.v-form .form-control {
  border: none !important;
}
.v-form .buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    width: 113px;
    height: 45px;
  }
}
.v-form .v-rating {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  .v-btn__content {
    font-size: 27px;
    color: #ff9a09;
  }
}
.filter_drawer_toggeler_wrapper {
  margin-block: 30px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .filter_drawer_toggeler {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;

    
  }

}
.filter_icon{
      
      font-size: 20px;
      font-family: Cairo-Bold;
      margin-right: 11px;
    }

.filter .mdi:before{
  color:black !important;
  font-size: 37px !important;
}
/* End ::style buttons */

// Start:: Pagination

.pagination {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

.filter {
  font-family: Cairo-Regular;

  .btn {
    background: none;
    border: none;
    outline: none;

    margin-top: 11px;
    font-size: 21px;

    &:hover {
      background: none;
      border: none;
      outline: none;
    }
  }
  .offcanvas-header {
    padding: 0;
  }
  #offcanvasRightLabel {
    text-align: center;
  }
  .offcanvas-body {
    background: #fbf9f4;
  }
  .form-select {
    border: none;
    margin-bottom: 30px;
    height: 50px;
    border-bottom: 2px solid #e9ecef85;
    border-radius: 0;
    background: transparent;
    color: #8d8d8d;
    font-size: 18px;

    padding-right: 7px;
  }
  .form-select:focus {
    box-shadow: none;
  }

  .offcanvas.show:not(.hiding) {
    min-width: 23%;
    max-width: 23%;
  }
  .form-control {
    border: none;
    background: transparent;
    text-align: start;
    font-size: 18px;
    color: #8d8d8d;
    margin-bottom: 8px;
  }
  .v-rating {
    display: flex;
    justify-content: start;
    align-items: start;
  }
  .mdi:before {
    color: #ccc;
    font-size: 42px;
  }
  .buttons {
    display: flex;
    align-items: center;

    justify-content: space-between;
    justify-items: center;

    button {
      padding: 0;
      width: 114px;
      height: 38px;
      border-radius: 20px;

      &:last-of-type {
        background: #8d8d8d2b !important;

        color: #00000087 !important;
        border: none;
      }
    }
  }
}

// End:: Pagination
</style>
