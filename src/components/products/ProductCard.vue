<template>
  <div>
    <v-container class="my_container">
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

              <!-- Start:: Wishlist Button  -->
              <button class="wishlist_btn" >
                <img
                  src="@/assets/icons/wishlist-3.png"
                  alt=""
                  v-if="not_fav"
                 
                  class="heart_img"
                  @click="addToWishlist(product.id)"
              
                />
              </button>
              <button class="wishlist_btn">
             
                <img
                class="heart_img"
                  src="@/assets/icons/wishlist-2.png"
                  alt=""
                  v-if="is_fav"
                  @click="removeFromWishlist(product.id)"
                
                />
              </button>
              <!-- End::Wishlist Button -->
            </div>
          </div>

          <!-- Start:: Acutions section -->
          <div class="acutions">
            <div class="acution_time">
              <v-icon icon="mdi-clock-time-four-outline" class="  " />

              <span class="remaining_time"
              ><span class="duration"> {{ product.time_remaining.day }} {{ $t('misc.day') }} </span
              ><span class="duration"> {{ product.time_remaining.hour }} {{ $t('misc.hour') }} </span
              ><span class="duration"> {{ product.time_remaining.minute }} {{ $t('misc.minute') }} </span></span
            >
            </div>
            <div class="number">
              <span class="acution_icon"><v-icon icon="mdi-gavel" /></span>
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
    </v-container>
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
    change_fav() {
      this.is_fav = !this.is_fav;
      this.not_fav = !this.not_fav;
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
}
}
</script>

<style lang="scss">
.auction_social_btns{
  z-index: 33;
    background: none;
    transition: all 0.3s ease-in-out 0s;
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: center;
    justify-items: center;
    /* left: 108px; */
    overflow: hidden;
    gap: 0;
    flex-direction: column;

    li{
      padding: 0;
      margin: 0;
    }
}
.product_card {
  position: relative;
  width: 300px;
  margin-block: 15px;
  border-radius: 15px;
  box-shadow: 0 0 10px 2px #e1e1e199;
  font-family: Cairo-Regular;
  direction: rtl;

  .main_image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    object-position: top;
    border-radius: 15px;
  }
  .product_details {
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 10px;

    .product_name {
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
    .brand_name {
      margin-block: 0;
      text-align: start;
      font-size: 16px;
      font-family: Cairo-SemiBold;
      color: #8d8d8d;
    }
    .price_and_btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .product_price {
        display: flex;
        align-items: center;
        justify-content: center;

        column-gap: 10px;
        font-family: Cairo-Bold;

        .price_without_sale {
          font-size: 16px;
          color: #313131;
          .price {
            margin: 0 5px;
          }
          .currency {
          }
        }
      }
      .card_btns {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        -moz-column-gap: 20px;
        column-gap: 20px;
        font-size: 22px;
        .share_btn {
          font-size: 18px;
        }
        .wishlist_btn {
        }
      }
    }
  }

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
}
</style>
