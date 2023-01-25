<template>
  <section class="main_content" v-if="dataFetched">
    <div class="product_details_content_wrapper">
      <section class="product_multi_carousel_wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-1 my-2 order-2 order-lg-1">
              <ul class="actions_btns_wrapper">
                <li class="list_item">
                  <button class="share_btn" @click="showShareMethod">
                    <v-icon icon="mdi-share-variant" />
                  </button>
                  <v-list
                    v-if="showShare"
                    style="
                      position: absolute;
                      right: -11px;
                      z-index: 10;
                      margin-top: -49px;
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
                </li>
                <li class="list_item" v-if="currentUser.token">
                  <button class="wishlist_btn">
                    <img
                      src="@/assets/icons/wishlist-1.png"
                      alt=""
                      v-if="not_fav"
                      @click="addToWishlist(product.id)"
                    />
                  </button>
                  <button class="wishlist_btn">
                    <img
                      src="@/assets/icons/wishlist-2.png"
                      alt=""
                      v-if="is_fav"
                      @click="removeFromWishlist(product.id)"
                    />
                  </button>
                </li>
                <li class="list_item" v-if="currentUser.token">
                  <router-link
                    :to="{
                      name: 'SingleChat',
                      params: {
                        Product_id: product.id,
                        Sender_id: product.user.id,
                      },
                    }"
                  >
                    <v-icon icon="mdi-chat-processing-outline" />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="col-lg-11 my-2 order-1 order-lg-2">
              <div class="product_details_wrapper">
                <v-row>
                  <v-col cols="12" lg="5" md="5" xs="12">
                    <Carousel
                      id="gallery"
                      :items-to-show="1"
                      :wrap-around="false"
                      v-model="currentSlide"
                    >
                      <Slide v-for="image in product.images" :key="image">
                        <div class="carousel__item big_image">
                          <img
                            class="image_wrapper"
                            :src="image.image_url"
                            alt=""
                          />
                        </div>
                      </Slide>
                    </Carousel>

                    <Carousel
                      id="thumbnails"
                      :items-to-show="4"
                      :wrap-around="true"
                      v-model="currentSlide"
                      ref="carousel"
                      class="small_images"
                    >
                      <Slide
                        v-for="(image, index) in product.images"
                        :key="image"
                      >
                        <div
                          class="carousel__item small_image"
                          @click="slideTo(index + 1 - 1)"
                        >
                          <img
                            class="small_img"
                            :src="image.image_url"
                            alt="image"
                            @click="changeopacity"
                            :style="{ opacity: newOpacity }"
                          />
                        </div>
                      </Slide>
                    </Carousel>
                  </v-col>

                  <!-- Start:: Product Info -->
                  <v-col cols="12" lg="7" md="7" xs="12">
                    <div class="product_info_wrapper">
                      <div class="name_and_price_wrapper">
                        <h4 class="product_name">{{ product.name }}</h4>
                        <h4 class="product_price">
                          <span class="price">{{ product.product_price }} </span
                          ><span class="currency ma-5">
                            {{ $t("misc.AED") }}</span
                          >
                        </h4>
                      </div>
                      <h5 class="desc_wrapper">{{ product.category.name }}</h5>
                      <div class="rate_wrapper">
                        <div class="rating">
                          <svg
                            v-for="rate in product.rate"
                            :key="rate"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-star-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                            />
                          </svg>
                          <svg
                            v-for="rate in 5 - product.rate"
                            :key="rate"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-star"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="product_specifications_wrapper">
                        <h5 class="specifications_item">
                          <span class="title">
                            {{ $t("misc.product condition") }} : </span
                          ><span class="value">
                            {{ product.productStatus.name }}
                          </span>
                        </h5>
                        <h5 class="specifications_item">
                          <span class="title">
                            {{ $t("misc.Available Quantity") }}: </span
                          ><span class="value"> {{ product.qty }} </span>
                        </h5>
                        <h5 class="specifications_item">
                          <span class="title">{{ $t("misc.state") }}:</span
                          ><span class="value">
                            {{ product.country.name }}
                          </span>
                        </h5>
                        <h5 class="specifications_item">
                          <span class="title">{{ $t("misc.city") }}:</span
                          ><span class="value"> {{ product.city.name }} </span>
                        </h5>
                        <h5 class="specifications_item">
                          <span class="title">
                            {{ $t("misc.Shipping Method") }}: </span
                          ><span class="value"
                            >{{ product.shippingWay.name }}
                          </span>
                        </h5>
                      </div>
                      <h5 class="user_wrapper">
                        <a href="/user-publishments/136" class="">
                          {{ $t("misc.Products Added By") }}
                          {{ product.user.username }}
                        </a>
                      </h5>

                      <!-- Start:: Auction Part -->
                      <div
                        class="active_auction_buttons"
                        v-if="product.auction_id"
                      >
                        <h4 class="start_value">
                          {{ $t("misc.auction with") }}
                          <span
                            >{{ product.product_price }}
                            {{ $t("misc.AED") }}</span
                          >
                        </h4>

                        <div class="current_value">
                          <h5 class="current_value_title">
                            {{ $t("misc.auction value") }}
                          </h5>
                          <div class="counter_wrapper">
                            <button
                              class="increment_btn"
                              @click="product_price += product.bid_value"
                            >
                              +
                            </button>
                           
                             <input disabled :value="product_price" class="value_wrapper">
                         
                            <button
                              class="decrement_btn"
                              @click="product_price -= product.bid_value"
                              :disabled="product_price <= product.product_price"
                            >
                              -
                            </button>
                          </div>
                          <h5 class="auction_remaining_time">
                            <v-icon icon="mdi-clock-outline" />
                            <span class="remaining_time"
                              ><span class="duration" style="margin: 0 5px">
                                {{ product.time_remaining?.day }}
                                {{ $t("misc.day") }} </span
                              ><span class="duration" style="margin: 0 5px">
                                {{ product.time_remaining?.hour }}
                                {{ $t("misc.hour") }} </span
                              ><span class="duration" style="margin: 0 5px">
                                {{ product.time_remaining?.minute }}
                                {{ $t("misc.minute") }}
                              </span></span
                            >
                          </h5>
                        </div>

                        <div class="buttons_wrapper mb-5">
                          <!-- Start:: Subscribe Auctions -->
                          <v-dialog v-model="subscribeAuctionDialog" persistent>
                            <template v-slot:activator="{ props }">
                              <button
                                class="btn"
                                v-bind="props"
                                :disabled="product.is_subscribed_on_auction==true || product.is_subscribed_on_dynamic_auction== true "
                              >
                                {{ $t("misc.auction") }}
                              </button>
                            </template>
                            <v-card>
                              <v-card-title class="text-h5">
                                {{ $t("misc.auctionNow") }}
                              </v-card-title>
                              <v-form
                                class="auctin_form"
                                @submit.prevent="subscribeOnAuction"
                              >
                                <input
                                  class="auction_input"
                                  :placeholder="$t('misc.auctionValue')"
                                  v-model="last_bid_price"
                                />

                                <v-card-actions>
                                  <v-btn
                                    class="btn auction_btn"
                                    variant="text"
                                    @click="subscribeAuctionDialog = false"
                                  >
                                    {{ $t("misc.Cancellation") }}
                                  </v-btn>
                                  <v-btn
                                    class="btn auction_btn"
                                    type="submit"
                                    @click="subscribeAuctionDialog = false"
                                  >
                                    {{ $t("misc.Start") }}
                                  </v-btn>
                                </v-card-actions>
                              </v-form>
                            </v-card>
                          </v-dialog>
                          <!-- End:: Subscribe Auctions -->

                          <!-- Start:: Dynamic Auctions -->
                          <v-dialog v-model="dialog" persistent>
                            <template v-slot:activator="{ props }">
                              <button
                                class="btn"
                                v-bind="props"
                                style="width: 186px"
                                :disabled="product.is_subscribed_on_auction==true || product.is_subscribed_on_dynamic_auction== true "
                              >
                                {{ $t("misc.auto auction") }}
                              </button>
                            </template>
                            <v-card>
                              <v-card-title class="text-h5">
                                {{ $t("misc.auction limit") }}
                              </v-card-title>
                              <v-form
                                class="auctin_form"
                                @submit.prevent="dynamicAuction"
                              >
                                <input
                                  class="auction_input"
                                  :placeholder="$t('misc.Maximum Bid Value')"
                                  v-model="bid_max_amount"
                                />

                                <v-card-actions>
                                  <v-btn
                                    class="btn auction_btn"
                                    variant="text"
                                    @click="dialog = false"
                                  >
                                    {{ $t("misc.Cancellation") }}
                                  </v-btn>
                                  <v-btn
                                    class="btn auction_btn"
                                    type="submit"
                                    @click="dialog = false"
                                  >
                                    {{ $t("misc.Start") }}
                                  </v-btn>
                                </v-card-actions>
                              </v-form>
                            </v-card>
                          </v-dialog>
                          <!-- End:: Dynamic Auctions -->

                          <button
                            class="btn"
                            @click="chooseWinner"
                            :disabled="product.is_subscribed_on_auction==true || product.is_subscribed_on_dynamic_auction== true "
                          >
                            {{ $t("misc.buy now") }}
                          </button>
                        </div>
                        <div role="dialog" class="v-dialog__container"></div>
                      </div>
                      <!-- End:: Acution Part -->
                    </div>
                  </v-col>
                  <!-- End:: Product Info -->
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Start:: Product Details -->

      <section class="product_details_wrapper">
        <div class="container">
          <div class="section_title_wrapper">
            <h2 class="section_title">{{ $t("misc.details") }}</h2>
          </div>

          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                {{ $t("misc.proAbout") }}
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                {{ $t("misc.comment") }}
              </button>
            </li>
          </ul>

          <!-- Start:: product about -->

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
             <p style="margin-bottom: 46px;"> {{ product.desc }}</p>

              <!-- Start:: add comment -->
              <div v-if="product.auction_id != null">
                <h5 class="auction_head">
                  {{ $t("misc.auctions list") }} ({{ product.bidders_count }})
                </h5>
                <h5 class="package_remaining_time auction_head">
                  <v-icon icon="mdi-clock-time-four-outline" />
                  <span class="remaining_time"
                    ><span class="duration" style="margin: 0 5px">
                      {{ product.time_remaining?.day }}
                      {{ $t("misc.day") }} </span
                    ><span class="duration" style="margin: 0 5px">
                      {{ product.time_remaining?.hour }}
                      {{ $t("misc.hour") }} </span
                    ><span class="duration" style="margin: 0 5px">
                      {{ product.time_remaining?.minute }}
                      {{ $t("misc.minute") }}
                    </span></span>
                  
                </h5>
                <span class="last_bid_price">{{ product.last_bid_price }}</span>
                <h5 class="auction_head">{{ product.your_bid_price }}</h5>
                <EmptyCard v-if="product.bidders_count==0" :text="$t('misc.noBidders')" />

                <ul class="rates_list">
                  <!-- Reminder:: review , product for auction -->

                  <li
                    class="rate_route_wrapper"
                    v-for="aucation in product.bidders"
                    :key="aucation.auction_id"
                  >
                    <div class="rate_content" style="width: 55%">
                      <div class="avatar_wrapper">
                        <img
                          :src="aucation.user.image"
                          width="90"
                          height="90"
                        />
                      </div>
                      <div class="rate_details_wrapper">
                        <div class="name_and_rate_date_wrapper">
                          <h5 class="name">
                            {{ aucation.user.username }}
                          </h5>

                          <h6 class="rate_date_wrapper">
                            {{ aucation.created_at }}
                          </h6>
                        </div>
                        <h6 class="comment_text" style="color: #34bf6c">
                          {{ aucation.last_bid_price }}
                        </h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- End:: add comment -->
            </div>
            <!-- End:: product about -->

            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <!-- Start:: add comment -->
              <div v-if="product.reviews.length > 0">
                <ul class="rates_list">
                  <li
                    class="rate_route_wrapper"
                    v-for="review in product.reviews"
                    :key="review.user.id"
                  >
                    <div class="rate_content">
                      <div class="avatar_wrapper">
                        <img
                          :src="review.user.image"
                          :alt="review.user.username"
                          width="90"
                          height="90"
                        />
                      </div>
                      <div class="rate_details_wrapper">
                        <div class="name_and_rate_date_wrapper">
                          <h5 class="name">
                            {{ review.user.username }}
                          </h5>
                          <div class="rating">
                            <svg
                              v-for="rate in review.rate"
                              :key="rate"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                              />
                            </svg>
                            <svg
                              v-for="rate in 5 - review.rate"
                              :key="rate"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-star"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                              />
                            </svg>
                          </div>

                          <h6 class="rate_date_wrapper">
                            {{ review.created_at }}
                          </h6>
                        </div>
                        <h6 class="comment_text">{{ review.review }}</h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- End:: add comment -->

              <!-- Start:: comments section -->
              <div>
                <div
                  class="v-card"
                  style="width: 100%; height: 100%"
                >
                  <div class="rates_list_wrapper">
                    <div class="container">
                      <div
                        class="empty_message_wrapper"
                        style="height: 40vh"
                        v-if="product.reviews.length < 1"
                      >
                        <div class="">
                          <img
                            src="https://www.speed4ever.com/img/rate.03fb12a4.svg"
                            alt="Empty Message"
                            width="300"
                            height="160"
                            margin-bottom="50"
                          />
                        </div>
                        <div class="text_wrapper">
                          <h3 class="message_title">
                            {{ $t("misc.no reviews") }}
                          </h3>
                        </div>
                      </div>
                      <form class="rate_form" @submit.prevent="create_rate">
                        <div class="container">
                          <div class="row">
                            <div class="col-12 my-3">
                              <div
                                class="input_wrapper"
                                style="border-color: rgb(233, 232, 232)"
                              >
                                <input
                                  type="text"
                                  :placeholder="$t('misc.single_comment')"
                                  class="form-control"
                                  v-model="review"
                                />
                              </div>
                            </div>
                            <div class="col-12 my-3">
                              <div class="rating_wrapper">
                                <label class="rating_label">
                                  {{ $t("misc.add_comment") }}
                                </label>
                                <div class="text-center">
                                  <v-rating
                                    v-model="rating"
                                    bg-color="orange-lighten-1"
                                    style="color: orange !important; font-size: 24px !important;"
                                    hover
                              
                                  ></v-rating>
                                </div>
                              </div>
                            </div>
                            <div class="btn_wrapper">
                              <button class="mt-0 btn" type="submit">
                                {{ $t("buttons.send") }}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <!---->
                </div>
              </div>

              <!-- End:: Comments section -->
            </div>
          </div>
        </div>
      </section>
      <!---->

      <!--  Start:: related products -->
      <section class="related_products_wrapper">
        <div class="container">
          <div class="section_content_wrapper">
            <div class="container">
              <div class="heading_div">
                <h2 class="section_title heading">{{ $t("misc.similar") }}</h2>
              </div>
              <div></div>
              <div>
                <v-container class="my_container">
                  {{ product.similar_products.name }}
                  <Carousel
                    :wrap-around="true"
                    :autoplay="1"
                    :transition="3000"
                    :breakpoints="breakpoints"
                  >
                    <Slide
                      v-for="related_product in product.similar_products"
                      :key="related_product.id"
                    >
                      <div class="carousel__item big_image">
                        <RelatedCard :related_product="related_product" />
                      </div>
                    </Slide>

                    <template #addons>
                      <Navigation />
                    </template>
                  </Carousel>
                  <main-button :router_link="router_link" :link_to="link_to" />
                </v-container>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--  end:: related products -->
    </div>
  </section>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { mapGetters } from "vuex";
import RelatedCard from "@/components/products/RelatedCard.vue";
import EmptyCard from "../EmptyCard.vue";
export default {
  props: ["id"],
  components: {
    Carousel,
    Slide,
    Navigation,
    RelatedCard,
    EmptyCard
},
  data() {
    return {
      breakpoints: {
     

        1200: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        750: {
          itemsToShow: 2,
          snapAlign: "start",
        },
      },
      
      bid_max_amount: null,
      last_bid_price: null,
      dialog: false,
      subscribeAuctionDialog: false,
      currentSlide: 0,
      newOpacity: 0.4,
      product: {
        required: true,
        type: Object,
      },
      auction_id: null,
      details: this.$route.params,
      products: null,
      dataFetched: false,
      rating: 0,
      review: null,
      showShare: false,
      is_fav: false,
      not_fav: true,
      bid_value: null,
      product_price:null,
      increase_val: null,
      decrese_val: null,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },

  methods: {
    slideTo(val) {
      this.currentSlide = val;
    },
    changeopacity() {
      this.newOpacity = 1;
    },
    showShareMethod() {
      this.showShare = !this.showShare;
    },
    change_fav() {
      this.is_fav = !this.is_fav;
      this.not_fav = !this.not_fav;
    },

    product_details() {
      this.axios({
        method: "GET",
        url: `product/${this.id}`,
      })
        .then((res) => {
          this.product = res.data.data;
          this.auction_id = res.data.data.auction_id;
          this.bid_value = res.data.data.bid_value;
          this.product_price = res.data.data.product_price;
          this.dataFetched = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    create_rate() {
      const form = new FormData();
      form.append("product_id", this.id);
      form.append("rate", this.rating);
      form.append("review", this.review);

      this.axios({
        method: "POST",
        url: "create-rate",
        data: form,
      })
        .then(() => {
          this.$toast.success(`You comment Successfully`);
          this.product_details();
          this.review = null;
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          this.$toast.error(error.response.data.message);
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

    getChats() {
      this.axios({
        method: "GET",
        url: "chats",
      })
        .then((res) => {
          this.chats = res.data.data;

          console.log(this.chats);
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    dynamicAuction() {
      const form = new FormData();
      form.append("auction_id", this.auction_id);
      form.append("bid_max_amount", this.bid_max_amount);
      this.axios({
        method: "POST",
        url: "subscribe_on_dynamic_auction",
        data: form,
      })
        .then(() => {
          this.$toast.success(`Subscribed Successfully`);
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    subscribeOnAuction() {
      const form = new FormData();
      form.append("auction_id", this.auction_id);
      form.append("last_bid_price", this.last_bid_price);
      this.axios({
        method: "POST",
        url: "subscribe_on_auction",
        data: form,
      })
        .then(() => {
          this.$toast.success(`Subscribed Successfully`);
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
  
    chooseWinner() {
      this.axios({
        method: "POST",
        url: `winner/${this.id}`,
      })
        .then(() => {
          this.$toast.success(`Buy Successfully`);
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
  },
  mounted() {
    this.product_details();
    this.getChats();
  },
};
</script>

<style scoped>
.main_content {
  font-family: Cairo-Regular;
}
.product_details_content_wrapper .product_multi_carousel_wrapper {
  background-color: #f7f5ef;
}

.container-fluid {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

.actions_btns_wrapper {
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  font-size: 24px;
}
.product_details_content_wrapper .product_details_wrapper {
  padding-block: 30px;
}
.multi_carousel_wrapper {
  overflow-x: hidden;
  -webkit-padding-start: 20px;
  padding-inline-start: 20px;
  width: 90%;
}

.product_details_content_wrapper
  .product_multi_carousel_wrapper
  .product_details_wrapper
  .product_info_wrapper {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 30px;
  width: 100%;
}

.name_and_price_wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  row-gap: 8px;
  font-family: Cairo-Bold;
}

.desc_wrapper {
  margin: 0;
  color: #313131;
  font-family: Cairo-Bold;
  opacity: 0.7;
}

.product_details_content_wrapper
  .product_multi_carousel_wrapper
  .product_details_wrapper
  .product_info_wrapper
  .product_specifications_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  -moz-column-gap: 15px;
  column-gap: 15px;
  row-gap: 20px;
}
.product_details_content_wrapper
  .product_multi_carousel_wrapper
  .product_details_wrapper
  .product_info_wrapper
  .product_specifications_wrapper
  .specifications_item {
  margin: 0;
  width: calc(50% - 15px);
  color: #313131;
}
.product_details_content_wrapper
  .product_multi_carousel_wrapper
  .product_details_wrapper
  .product_info_wrapper
  .product_specifications_wrapper
  .specifications_item
  span.title {
  color: #8d8d8d;
  font-family: Cairo-SemiBold;
}
.specifications_item span.value {
  margin-inline-start: 8px;
}

.user_wrapper a {
  color: #6c98a2;
}
.related_products_wrapper {
}
.list_item {
  margin: 0;
  font-size: 20px;
}
.list_item a {
  color: #313131;
}
.big_image {
  width: 90%;
}
.image_wrapper {
  width: 100%;
  height: 100%;
}
.small_images {
  padding: 0px 50px;
}
.small_image {
  width: 80px;
  height: 95px;
  /* opacity: 0.4; */
  cursor: pointer;
}
.small_img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  object-position: top;
  border-radius: 10px;
}
.rating {
  /* width: 45%; */

  margin-bottom: 7px;
  display: flex;
  column-gap: 5px;
}
.rating svg {
  color: #ffae1a;
  /* color: #ccccccd1; */
  width: 25%;
}
.nav-pills .nav-link {
  background: transparent;
  border-radius: none;
  color: #8d8d8d;
  font-family: Cairo-SemiBold;
  font-size: 20px;
}

.nav-pills .nav-link.active {
  color: #6c98a2;
  border-bottom: 2px solid #6c98a2;
  background-color: white !important;
  color: #6c98a2;
  border-radius: 0;
}
.nav-pills .nav-link:hover {
  color: #8d8d8d;
}

.section_title {
  font-family: Cairo-ExtraBold;
}
.tab-pane {
  font-size: 20px;
}

/* start reviews section */

.empty_message_wrapper {
  /* height: 40vh; */
  flex-direction: column;

  display: flex;
  align-items: center;
  justify-content: center;

  /* margin-bottom: 25px; */
  color: #6c98a2;
}
.message_title {
  margin-top: 25px;
  margin-bottom: 25px;
}

.rates_list_wrapper .rate_form .rating_wrapper {
  width: 100%;

  border: 2px solid #f3f3f3;
  background-color: #f3f3f3;

  border-radius: 10px;
}
form {
  text-align: center;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 10px;
}
.input_wrapper {
  margin-block: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px solid rgb(233, 232, 232);
  background-color: transparent;
}
.input_wrapper {
  text-align: start;
}
.input_wrapper input {
  border: none;
  padding: 12px;
  -webkit-padding-start: 0;
  padding-inline-start: 0;
  font-size: 16px;
  color: #313131;
  background-color: transparent;
}
.input_wrapper input::placeholder {
  text-align: start;
}
.rates_list_wrapper .rate_form .rating_wrapper .rating_label {
  font-size: 24px;
  font-family: Cairo-Bold;
  color: #313131;
  margin-bottom: 13px;
}
.image_wrapper {
  width: 100%;

  height: 550px;

  object-fit: cover;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  margin-bottom: 40px;
}
.image_wrapper img {
  /* height: 100%; */
}

.rates_list_wrapper .rate_form .btn_wrapper {
  margin-top: 20px;
}
form .btn_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  text-decoration: none;
  position: relative;
  display: inline-block;
  width: 150px;
  text-align: center;
  margin-top: 30px;
  padding: 5px 20px;
  font-size: 20px;
  font-family: Cairo-SemiBold;
  color: #fff;
  background-image: linear-gradient(90deg, transparent 50%, #6c98a2 0);
  background-position: 100%;
  background-size: 400%;
  border: 1px solid #6c98a2;
  border-radius: 35px;
  transition: all 0.6s ease-in-out;
  margin-bottom: 25px;
}

.btn:hover {
  background-position: 0;
  background-color: white;
  color: #6c98a2;
}

/* end reviews section */

/* Start:: comments css */
.rates_list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.rate_content {
  width: 98%;

  padding: 20px;
  margin-block: 10px;
  border: 2px solid #f3f3f3;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  column-gap: 15px;
  border-radius: 10px;
  overflow-x: hidden;
}

.rate_route_wrapper {
  margin: 0;
  float: none;
}
.avatar_wrapper img {
  border-radius: 50%;

  object-fit: cover;
}
.rate_details_wrapper {
  width: 100%;
}
.name_and_rate_date_wrapper {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment_text {
  color: #313131;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* End:: comments  */

/* Start:: auctions */

.active_auction_buttons,
.current_value,
.counter_wrapper {

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 15px;
}
.counter_wrapper {
  flex-direction: row !important;
}
.buttons_wrapper {
  display: flex;
  align-items: center;
  justify-items: center;
  column-gap: 6px;
}
.start_value {
  margin: 0;
  color: #313131;
}
.active_auction_buttons .start_value span {
  color: #6c98a2;
  font-family: Cairo-Bold;
}
.current_value_title {
  margin-bottom: 20px;
  text-align: center;
  color: #313131;
  font-family: Cairo-SemiBold;
}

.decrement_btn,
.increment_btn {
  width: 40px;
  height: 40px;
  color: #313131;
  font-size: 30px;
  font-family: Cairo-Bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.value_wrapper {
  color: #6c98a2;
  font-size: 25px;
  font-family: Cairo-Bold;
  padding: 2px 23px;
  width: 109px;
  border: 1px solid #313131;
  border-radius: 35px;
}

.auction_remaining_time {
  margin-top: 20px;
  text-align: center;
  color: #313131;
}
.auction_head:first-of-type {
  font-family: Cairo-ExtraBold;
}
.auction_head {
  font-size: 1.25rem;
  text-align: center;
  margin: 14px 0;
  font-family: Cairo-SemiBold;
}
.auction_head:last-of-type {
  color: #34bf6c;
}
/* End:: auctions */

/* Start:: Dynamic Auction */

.v-card {
  width: 30%;
  margin: auto;
  height: 260px;
}
.v-card .v-card-title {
  line-height: 2rem;
  text-align: center;
  margin: 20px 0;
  font-family: Cairo-Medium !important;
}
.auctin_form {
  background: white !important;
  border-bottom: 2px solid #f3f3f3;
  font-family: Cairo-Medium !important;
}

.auctin_form .auction_input {
  width: 100%;
  text-align: start !important;
  outline: none;
  font-family: Cairo-Medium !important;
}

.auction_btn {
  border-radius: 5px !important;
  width: max-content;
  height: 40px;
  margin: 0;
  padding: 0;
  font-size: 15px;
}
.v-card-actions {
  align-items: center;
  display: flex;
  min-height: 52px;
  justify-content: center;
  justify-items: center;
  text-align: center;
  margin: auto;
}
.last_bid_price{
  text-align: center;
    display: block;
    color: #34bf6c;
    font-weight: 800;
    font-size: 23px;
}
/* End:: Dynamic Auction */



.v-btn__content {
  
    color: orange !important;
    font-size: 24px !important;
}

@media (max-width: 991px) {
  .actions_btns_wrapper{
display: none;
  }
}
</style>
