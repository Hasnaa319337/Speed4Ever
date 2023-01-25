<template>
  <div
    data-aos="fade-in"
    data-aos-offset="200"
    data-aos-delay="100"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="true"
    data-aos-anchor-placement="top-center"
  >
    <div class="form_logo">
      <router-link to="/">
        <img src="@/assets/images/logo.bb997692.svg" />
      </router-link>
    </div>
    <div class="form_title">
      <h1 style="font-family: Cairo-Bold">
        {{ $t("misc.Validation code") }}
      </h1>
      <h3>{{ $t("misc.message sent") }}</h3>
      <p>{{ phone }}</p>
    </div>
    <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="verify"
      >
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: center;
            justify-items: center;
            align-items: center;
            direction: ltr;
            margin: 20px 0;
          "
        >
          <v-otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator=" "
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['-', '-', '-', '-']"
            @on-change="handleOnChange"
            v-model="code"
            @on-complete="handleOnComplete"
          />

          <!-- <input type="text" v-model="code" placeholder="code"> -->
        </div>
        <div class="button_div">
          <button
            type="submit"
            class="confirm_btn"
            style="width: 145px; height: 44px; padding: 5px"
          >
            {{ $t("buttons.send") }}
          </button>
        </div>
      </v-form>
      <router-link to="/auth/:auth/login" class="login_route">
        <span> {{ $t("buttons.Resend Code") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: localStorage.getItem("phone_number"),
      code: null,
    };
  },
  methods: {
    verify() {
      console.log(this.code);
      const verify_data = new FormData();
      verify_data.append("phone", this.phone);
      // verify_data.append("code", this.code);
      verify_data.append("code", "00971");
      verify_data.append("device_token", "7485996");
      verify_data.append("type", "ios");

      this.axios({
        method: "POST",
        url: "auth/verify",
        data: verify_data,
      })
        .then(() => {
          this.$router.push("/auth/:auth/login");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Error");
        });
    },
    handleOnComplete(e) {
      this.code = e;
    },
  },
};
</script>
<style lang="scss">
.otp-input {
  width: 70px;
  height: 60px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  //   border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: #f7f5ef;
  text-align: center !important;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #f7f5ef;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

.auth {
  .form_title {
    padding-block: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 8px;
  }
  .login_route {
    margin-top: 20px;

    text-decoration: none;
    display: block;
    text-align: center;
    span:first-of-type {
      font-size: 18px;
      color: #8d8d8d;
    }
    span:last-of-type {
      color: #6c98a2;
      font-family: Cairo-SemiBold;
    }
  }
  .v-field__field {
    background: white;
  }
}
</style>
