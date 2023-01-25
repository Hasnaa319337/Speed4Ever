<template>
  <div class="filter">
    <button
      class="btn"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      {{ $t("misc.filter") }}
    </button>

    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <h5 id="offcanvasRightLabel">{{ $t("misc.filter") }}</h5>
      <div class="offcanvas-body">
        <!-- Start:: Form Filter -->

        <v-form @submit.prevent="FilterMethod">
          <!-- country option  -->
          <select class="form-select" v-model="filter.country_option">
            <option selected>{{ $t("placeholder.country") }}</option>
            <option
              :value="country.name"
              v-for="country in countires_options"
              :key="country.id"
            >
              {{ country.name }}
            </option>
          </select>
          <!--  -->

          <!--  -->

          <select class="form-select" v-model="filter.shipping_option">
            <option selected>{{ $t("misc.Shipping Method") }}</option>
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
            <option>{{ $t("misc.product condition") }}</option>
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
            <button class="confirm_btn" style="">
              {{ $t("misc.Cancellation") }}
            </button>
          </div>
        </v-form>
        <!-- End:: Form Filter -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "filterData"],
  data() {
    return {
      filter:{
      id:null,
        country_option: null,
        shipping_option: null,
        status_option: null,
        rating: 0,
      },

      product_status: null,
      shipping_method: null,
      countires_options: null,
      filterdProducts: [],
    };
  },
  methods: {
    filterMethod() {
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
   
        })
        .catch(() => {
          // this.$toast.error(error.data.message);
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
  },
  mounted() {
    this.filterMethod();
    this.productStatus();
    this.shippingWay();
    this.countires();

  
  },
};
</script>

<style lang="scss">
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
</style>
