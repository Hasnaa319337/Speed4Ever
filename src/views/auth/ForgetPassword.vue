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
        {{ $t("placeholder.Account Confirmation") }}
      </h1>
      <h3>{{ $t("misc.Please") }}</h3>
    </div>
    <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="handleForget"
      >
        <v-text-field
          v-model="form.phone"
          :error-messages="errors"
          :label="$t('placeholder.mobileNumber')"
          required
        ></v-text-field>
        <div class="button_div">
          <button type="submit" class="confirm_btn">
            {{ $t("buttons.send") }}
          </button>
        </div>
      </v-form>
      <router-link to="/auth/:auth/login" class="login_route">
        <span>{{ $t("misc.Already") }}</span
        ><span> {{ $t("buttons.signIn") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    checkbox: false,
    form: {
      phone: null,
    },
  }),

  methods: {
    handleForget() {
      const forgetData = new FormData();
      forgetData.append("phone", this.form.phone);
      this.axios({
        method: "POST",
        url: "auth/send_code",
        data: forgetData,
      })
        .then(() => {
          localStorage.setItem("phone_num", this.form.phone);
          this.$toast.success(`Code Sent Successfully`);
          this.$router.push("/auth/:auth/reset-password");
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          // console.log(err.request);
          this.$toast.error(`The select Phone Is Invalid`);
        });
    },
  },
};
</script>

<style lang="scss">
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
