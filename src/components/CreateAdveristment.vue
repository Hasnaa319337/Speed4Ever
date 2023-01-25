<template>
  <div>
    <HeadCard />
    <div class="adveristment">
      <v-container class="my_container">
        <v-form
          @submit.prevent="createAds"
          :class="$i18n.locale == 'en' ? 'leftClass' : 'is-rtl'"
        >
          <div class="input_wrapper image_div leftClass">
            <input
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="previewMultiImage"
              class="form-control-file"
              id="add_img"
            />
            <label for="add_img">
              <v-icon icon="mdi-camera-outline" style="left: 0" />
              <span class="upload_image_placeholder">
                {{ $t("placeholder.add image") }}</span
              ></label
            >

            <div class="p-2 mt-3 uploding_image">
              <template v-if="image_list.length">
                <div v-for="(item, index) in image_list" :key="index">
                  <img :src="item.src" class="img-fluid" />
                  <button @click="deleteImage(item === '')">
                    <v-icon icon="mdi-close" />
                  </button>
                </div>
              </template>
            </div>
          </div>

          <div class="input_wrapper">
            <input
              type="text"
              :placeholder="$t('placeholder.product name')"
              v-model="form.name"
            />
          </div>
          <div class="input_wrapper">
            <input
              type="text"
              :placeholder="$t('placeholder.product desc')"
              v-model="form.desc"
            />
          </div>

          <div class="input_wrapper">
            <input
              type="text"
              :placeholder="$t('placeholder.qty')"
              v-model="form.qty"
            />
          </div>

          <!-- Category -->
          <select
            class="form-select"
            v-model="form.category_id"
            @change="findSubId"
          >
            <option selected disabled value="">
              {{ $t("placeholder.main cat") }}
            </option>
            <option :value="cat.id" v-for="cat in categories" :key="cat.id">
              {{ cat.name }}
            </option>
          </select>

          <!-- subCategory -->
          <select class="form-select" v-model="form.sub_category_id">
            <option selected disabled value="">
              {{ $t("placeholder.subcategory") }}
            </option>
            <option :value="sub.id" v-for="sub in subcategory" :key="sub.id">
              {{ sub.name }}
            </option>
          </select>

          <!-- country option  -->
          <select
            class="form-select"
            v-model="form.country_id"
            @change="findCityId"
          >
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

          <!-- city option  -->
          <select class="form-select" v-model="form.city_id">
            <option selected disabled value="">{{ $t("misc.city") }}</option>
            <option
              :value="city.id"
              v-for="city in cities_options"
              :key="city.id"
            >
              {{ city.name }}
            </option>
          </select>

          <!-- Shipping option -->

          <select class="form-select" v-model="form.shipping_way_id">
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

          <!-- product status -->

          <select class="form-select" v-model="form.product_status_id">
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

          <v-switch
            v-model="form.is_bid"
            :label="$t('placeholder.add as auction')"
            color="rgb(108 152 162)"
       
            hide-details
            @click="showMoreMethod"
            ref="switch"
          ></v-switch>

          <div class="collect_divs" v-if="is_bid">
            <div class="input_wrapper">
              <span class="ant-calendar-picker"
                ><div class="">
                  <input
                    :placeholder="$t('placeholder.Auction start date')"
                    type="date"
                    v-model="form.start_bid_date"
                  /></div
              ></span>
            </div>

            <div class="input_wrapper">
              <span class="ant-calendar-picker"
                ><div class="">
                  <input
                    :placeholder="$t('placeholder.Auction end date')"
                    type="date"
                    v-model="form.end_bid_date"
                  /></div
              ></span>
            </div>

            <div class="input_wrapper">
              <input
                type="number"
                :placeholder="$t('placeholder.Auction start price')"
                v-model="form.bid_price"
              />
            </div>

            <div class="input_wrapper">
              <input
                type="number"
                v-model="form.bid_value"
                :placeholder="$t('placeholder.Bid value')"
              />
            </div>
          </div>

          <v-switch
            v-model="form.is_direct_sale"
            :label="$t('placeholder.add directly')"
            color="rgb(108 152 162)"
            value="rgb(108 152 162)"
            hide-details
            @click="showMoreMethod1"
            ref="switch1"
          ></v-switch>

          <div class="input_wrapper" v-if="showMore1">
            <input
              type="text"
              :placeholder="$t('placeholder.selling price')"
              v-model="form.product_price"
            />
          </div>

          <div class="button_div" style="margin: 25px 0">
            <button type="submit" class="confirm_btn">
              {{ $t("buttons.add_product") }}
            </button>
          </div>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
import HeadCard from "./HeadCard.vue";

export default {
  components: { HeadCard },
  data: () => ({
    showMore: false,
    showMore1: false,
    preview: null,
    image: null,
    preview_list: [],
    image_list: [],
    rules: [
      (value) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 2000000 ||
          "Avatar size should be less than 2 MB!"
        );
      },
    ],
    ex11: [

    ],
    ex12: [
    
    ],
    showMessages: false,
    items: [],
    country_option: null,
    shipping_option: null,
    status_option: null,

    shipping_method: null,
    countires_options: [],
    cities_options: [],
    subcategory: [],
    categories: [],
    product_status: [],

    form: {
      image: null,
      name: null,
      product_price: null,
      desc: null,
      category_id: "",
      sub_category_id: "",
      country_id: "",
      city_id: "",

      shipping_way_id: "",
      product_status_id: "",
      qty: null,
    
      images: [],

      is_bid: false,

      start_bid_date: null,
      end_bid_date: null,
      bid_value: null,
      bid_price: null,
    },
  }),
  methods: {
    // Start:: Upload Images
    previewMultiImage(e) {
      if (e.target.files) {
        for (let index = 0; index < e.target.files.length; index++) {
          this.image_list.push({
            id: index+1,
            file: e.target.files[index],
            src: URL.createObjectURL(e.target.files[index]), 
          });
        }
      }
    },
    // End:: Upload Images

    // Start:: Show Methods
    showMoreMethod() {
      this.is_bid = !this.is_bid;

    },
    showMoreMethod1() {
      this.showMore1 = !this.showMore1;
    },

    // End:: Show Methods

    // Start:: create ads method
    createAds() {
      const form = new FormData();
      form.append("main_image", this.image_list[0].file);
      this.image_list.forEach((element, index) => {        
        form.append(`images[${index}]`, element.file);
      });
      form.append("name", this.form.name);
      form.append("desc", this.form.desc);
      form.append("category_id", this.form.category_id);
      form.append("sub_category_id", this.form.sub_category_id);
      form.append("country_id", this.form.country_id);
      form.append("city_id", this.form.city_id);
      form.append("shipping_way_id", this.form.shipping_way_id);
      form.append("product_status_id", this.form.product_status_id);
      form.append("qty", this.form.qty);

      if(this.showMore1) {
        form.append("is_direct_sale",'1');
        form.append("product_price", this.form.product_price);
      } else {
        form.append("is_bid", 1);
        form.append("start_bid_date", this.form.start_bid_date);
        form.append("end_bid_date", this.form.end_bid_date);
        form.append("bid_price", this.form.bid_price);
        form.append("bid_value", this.form.bid_value);
      }

      this.axios({
        method: "POST",
        url: "product",
        data: form,
      })
        .then(() => {
          this.$toast.success(`Created  Successfully`);
        })
        .catch(() => {});
    },
    // End:: create ads method

    // Start:: Product Status
    productStatus() {
      this.axios({
        method: "GET",
        url: "productStatuses",
      })
        .then((res) => {
          this.product_status = res.data.data;
        })
        .catch(() => {});
    },
    // End:: Product Status

    // Start:: shippingWay
    shippingWay() {
      this.axios({
        method: "GET",
        url: "shippingWays",
      })
        .then((res) => {
          this.shipping_method = res.data.data;
        })
        .catch(() => {});
    },
    // End:: shippingWay

    // Start:: countires
    countires() {
      this.axios({
        method: "GET",
        url: "countries",
      })
        .then((res) => {
          this.countires_options = res.data.data;
        })
        .catch(() => {});
    },

    // End:: countires

    // Start:: city
    cities() {
      this.axios({
        method: "GET",
        url: `cities/${this.form.country_id}`,
      })
        .then((res) => {
          this.cities_options = res.data.data;
        })
        .catch(() => {});
    },
    //End:: city

    //  Start::Category
    category() {
      this.axios({
        method: "GET",
        url: "categories",
      })
        .then((res) => {
          this.categories = res.data.data;
        })
        .catch(() => {});
    },

    //  End:: Category

    // Start::SubCategory
    subcategories() {
      this.axios({
        method: "GET",

        url: `subCategories/${this.form.category_id}`,
      })
        .then((res) => {
          this.subcategory = res.data.data;
          console.log(this.subcategory);
        })
        .catch(() => {});
    },
    // End:: SubCategory

    findSubId() {
      this.subcategories();
    },
    findCityId() {
      this.cities();
    },
  },
  mounted() {
    this.productStatus();
    this.shippingWay();
    this.countires();
    this.category();
  },
};
</script>

<style lang="scss">
.form-select {
  border: none !important;
  border-bottom: 1px solid rgb(234, 232, 232) !important;
  border-radius: 0 !important;
  margin: 20px 0;
}
.adveristment {
  font-family: Cairo-Regular;
  .v-switch {
    font-family: Cairo-SemiBold;
    color: #c1c1c1;
  }
  .v-field__field {
    background: white;
  }
  .v-field__append-inner {
    display: none;
  }
  .v-select .v-field.v-field {
    padding: 0 !important;
  }
  input {
    width: 100%;
  }
  .v-field--variant-filled .v-field__outline::before,
  .v-field--variant-filled .v-field__outline::after {
    display: none;
  }
}
form {
  .input_wrapper {
    margin-block: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 2px solid #f3f3f3;
    background-color: transparent;
    color: #8d8d8d;
    input {
      border: none;
      text-align: start;
    }
  }
  .image_div {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;

    input {
      display: none;
    }

    label {
      width: 150px;
      height: 150px;
      background-color: transparent;
      border: 2px solid #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      row-gap: 6px;
      border-radius: 10px;
      color: #8d8d8d;
      cursor: pointer;
      .v-icon {
        font-size: 60px;
        top: 25px;
        left: 50px;
        color: #cbc9c9;
        height: 45px;
      }
      span {
        font-size: 16px;
        font-family: Cairo-SemiBold;
        margin-top: 30px;
      }
    }
    .uploding_image {
      display: flex;
      border-radius: 10px;
      position: relative;
      column-gap: 13px;

      div {
        width: 140px;
        height: 200px;
      }

      button {
        position: absolute;
        top: 7px;
        left: 8px;
        background: #e74343;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        font-size: 11px;
        text-align: center;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        object-position: top;
        border-radius: 10px;
      }
    }
  }

  .collect_divs {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .disabled {
    display: none;
  }
}
.v-field__input {
  padding-right: 0;
  padding-left: 0;
}
.select_cat {
  color: #8d8d8d;
  &::placeholder {
    color: #8d8d8d;
  }
}
.leftClass {
  direction: ltr;
}
.form-select {
  color: #8d8d8d !important;
}
</style>
