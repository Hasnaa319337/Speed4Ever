<template>
  <div>
    <HeadCard />
    <div class="tabs">
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
            {{ $t("buttons.Auctions") }}
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
            {{ $t("buttons.my auctions") }}
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div
            class="auction_content"
            v-for="auction in other_auctions"
            :key="auction.auction_id"
          >
            <router-link
              :to="{
                name: 'ProductDetails',
                params: { id: auction.product_id },
              }"
              class="horizontal_product_card_content_wrapper my-4"
              ><div class="product_image_wrapper">
                <img
                  :src="auction.product.main_image"
                  width="250"
                  height="250"
                />
              </div>
              <div class="product_details_wrapper">
                <h4 class="product_name">
                  {{ auction.product.category.name }}
                </h4>
                <h4 class="auction_duration">
                  <span class="icon_wrapper"><i class="fal fa-clock"></i></span
                  ><span class="duration"> ي 19 </span
                  ><span class="duration"> س 23 </span
                  ><span class="duration"> د 49 </span>
                </h4>
                <h5 class="price_and_status_wrapper">
                  <div class="price_wrapper">
                    <span class="price">
                      {{ auction.product.product_price }} </span
                    ><span class="currency"> {{ $t("misc.AED") }}</span>
                  </div>
                  <span class="status_wrapper pending">
                    {{ auction.status }}
                  </span>
                </h5>
              </div>
            </router-link>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div
            class="auction_content"
            v-for="auction in my_auctions"
            :key="auction.auction_id"
          >
            <router-link
              :to="{
                name: 'ProductDetails',
                params: { id: auction.product_id },
              }"
              class="horizontal_product_card_content_wrapper my-4"
              ><div class="product_image_wrapper">
                <img
                  :src="auction.product.main_image"
                  width="250"
                  height="250"
                />
              </div>
              <div class="product_details_wrapper">
                <h4 class="product_name">
                  {{ auction.product.category.name }}
                </h4>
                <h4 class="auction_duration">
                  <span class="icon_wrapper"><i class="fal fa-clock"></i></span
                  ><span class="duration"> ي 19 </span
                  ><span class="duration"> س 23 </span
                  ><span class="duration"> د 49 </span>
                </h4>
                <h5 class="price_and_status_wrapper">
                  <div class="price_wrapper">
                    <span class="price">
                      {{ auction.product.product_price }} </span
                    ><span class="currency"> {{ $t("misc.AED") }}</span>
                  </div>
                  <span class="status_wrapper pending">
                    {{ auction.status }}
                  </span>
                </h5>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadCard from "@/components/HeadCard.vue";

export default {
  components: { HeadCard },
  data() {
    return {
      other_auctions: null,
      my_auctions: null,
    };
  },

  methods: {
    getOtherAuctions() {
      this.axios({
        method: "GET",
        url: "auctions?type=other",
      })
        .then((res) => {
          this.other_auctions = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMyAuctions() {
      this.axios({
        method: "GET",
        url: "auctions?type=me",
      })
        .then((res) => {
          this.my_auctions = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getOtherAuctions();
    this.getMyAuctions();
    console.log(this.my_auctions);
  },
};
</script>

<style lang="scss">
.tabs {
  width: 50%;
  margin: auto;
  padding: 50px 0;
}
/* Start:: style tabs */
.tabs ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-slide-group__content {
  justify-content: space-between;
  justify-items: center;
  column-gap: 70px;
}

.nav-link {
  background: transparent !important;
  border-bottom: 2px solid #cccccc1f !important;
  border-top: none;
  color: #8d8d8d !important;
  font-family: Cairo-SemiBold;
  font-size: 20px;
}

.nav-link.active {
  color: #6c98a2 !important;
  border-bottom: 2px solid #6c98a2 !important;
  background-color: white !important;

  border-radius: 0;
}

/* End:: styles tabs */

/* Start:: Style Auction Card */

.horizontal_product_card_content_wrapper {
  margin-block: 0;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  -moz-column-gap: 20px;
  column-gap: 20px;
  background-color: #f3f3f3;
  border: 2px solid #f3f3f3;
  border-radius: 10px;

  .product_image_wrapper img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    object-position: top;
    border-radius: 10px;
  }

  .product_details_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 18px;

    .product_name {
      font-family: Cairo-Bold;
      font-size: 20px;
      color: #313131;
    }
    .auction_duration span {
      font-family: Cairo-SemiBold;
      font-size: 18px;
      color: #313131;
    }

    h4 {
      font-family: Cairo-Bold;
      font-size: 20px;
    }

    .price_and_status_wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price_wrapper {
        span {
          font-size: 20px;
          font-family: Cairo-Bold;
          color: #34bf6c;
        }
      }
      span.pending {
        color: #fd0;
        font-family: Cairo-SemiBold;
      }
    }
  }
}
/* End:: Style Auction Card */
</style>
