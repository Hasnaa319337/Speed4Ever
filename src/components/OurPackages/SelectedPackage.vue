<template>
  <div>
    <div style="padding: 20px">
      <v-container class="my_container">
        <div class="row justify_content package_width">

          <!-- package Card -->
          <div class="package_card" style="width: 70%;margin-bottom:5px">
            <h5 class="package_title">{{ name }}</h5>
            <h3 class="package_desc">
              {{ number_of_products }} {{ $t("misc.monthly") }}
            </h3>
            <h5 class="package_price">
              <span class="price" style="margin: 0 7px">
                {{ package_price }}
              </span>
              <span class="currency"> {{ $t("misc.AED") }} </span>
            </h5>
          </div>


          <div class="promo_code_wrapper" style="width: 70%">
            <input
              type="text"
              :placeholder="$t('buttons.promo code')"
              v-model="promo_code"
            /><button class="send_promo_code_btn" @click="getCoupon">
              {{ $t("buttons.send") }}
            </button>
          </div>
        </div>
        <div class="row justify_content">
          <div class="package_form">
            <v-form @submit.prevent="subscribeOnPackage">
              <div class="input_div">
                <input
                  type="number"
                  required
                  :placeholder="$t('placeholder.transiction number')"
                  class="form-control transiction_input"
                  v-model="transaction_id"
                />
              </div>
              <div class="button_div">
                <button style="width: 200px" type="submit">
                  {{ $t("buttons.pay") }}
                </button>
              </div>
            </v-form>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
  
      transaction_id: null,
      promo_code: null,
      package_details: null,
      package_price:null,
      number_of_products:null,
      name:null
   
    };
  },
  props:['id'],
  methods: {
    getPromoCode() {
      this.axios({
        method: "GET",
        url: `${this.id}/${this.promo_code}`,
      })
        .then(() => {

        })
        .catch(() => {
          this.$toast.error(`Invalid Promo Code`);
        });
    },

    getPackageDetails() {
      this.axios({
        method: "GET",
        url: `packages/${this.id}`,
      })
        .then((res) => {
          this.package_price = res.data.data.package_price;
          this.number_of_products = res.data.data.number_of_products;
          this.name = res.data.data.name;
   
        })
        .catch(() => {});
    },

    subscribeOnPackage() {
      const form = new FormData();
      form.append("package_id", this.id);
      form.append("transaction_id", this.transaction_id);
      form.append("promo_code", this.promo_code);
      this.axios({
        method: "POST",
        url: "subscribe_on_package",
        data: form,
      })
        .then(() => {
          this.$toast.success(`You Subscribe Successfully`);
          this.$router.push("/packages");
        })
        .catch(() => {});
    },
    getCoupon(){
      this.getPromoCode();
    }
  },
  mounted() {
    this.getPackageDetails();
   
  },
};
</script>

<style lang="scss">
.justify_content {
  justify-content: center !important;
  font-family: Cairo-Regular;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  .single_package {
    &:hover {
      transform: none;
    }
  }
  .promo_code_wrapper {
    margin-block: 10px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
    column-gap: 10px;
    background-color: #f7f5ef;
    border: 2px solid #f7f5ef;
    border-radius: 10px;

    input {
      margin: 0;
      padding: 0;
      border: none;
      background-color: transparent;
      box-shadow: none;
      color: #313131;
      text-align: start;
    }

    button {
      color: #313131;
      font-family: Cairo-SemiBold;
    }
  }
  .package_form {
    width: 85%;
    .input_div {
      margin-block: 25px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      border-bottom: 2px solid #f3f3f3;
      background-color: transparent;

      input {
        border: none;
        padding: 12px;
        -webkit-padding-start: 0;
        padding-inline-start: 0;
        font-size: 16px;
        color: #313131;
        background-color: transparent;
      }
    }
    .button_div {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        position: relative;
        display: inline-block;
        width: 150px;
        text-align: center;
        margin-top: 30px;
        padding: 5px 20px;
        font-size: 20px;
        font-family: Cairo-SemiBold;
        color: #f3f3f3;
        background-image: linear-gradient(90deg, transparent 50%, #6c98a2 0);
        background-position: 100%;
        background-size: 400%;
        border: 1px solid #6c98a2;
        border-radius: 35px;
        transition: all 0.6s ease-in-out;
        margin-top: 25px;

        &:hover {
          color: #6c98a2;
          background-position: 0;
        }
      }
    }
  }
}
</style>
