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
        {{ $t("misc.Create an account") }}
      </h1>

      <h3>
        {{
          $t("misc.Welcome, you can register your data to create a new account")
        }}
      </h3>
    </div>
    <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        fluid
        @submit.prevent="handleSubmit"
      >
        <v-text-field
          v-model="form.username"
          :label="$t('placeholder.userName')"
          type="text"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          :label="$t('placeholder.emailAddress')"
          type="email"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.phone"
          :counter="11"
          :error-messages="errors"
          :label="$t('placeholder.mobileNumber')"
          type="tel"
          required
        ></v-text-field>

        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-2"
          :label="$t('placeholder.password')"
          hint="At least 6 characters"
          class="input-group--focused"
          @click:append="show1 = !show1"
          v-model="form.password"
        ></v-text-field>

        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          :label="$t('placeholder.cNewPassword')"
          hint="At least 6 characters"
          class="input-group--focused"
          @click:append="show2 = !show2"
          v-model="form.confirm_password"
        ></v-text-field>

        <v-switch
          v-model="ex11"
          label="بمجرد إنشاء الحساب هذا دليل على موافقتك على الشروط و الأحكام الخاصة بالتطبيق"
          color="rgb(108 152 162)"
          value="rgb(108 152 162)"
          hide-details
          @click="confirmation"
        ></v-switch>

        <div class="button_div">
          <button type="submit" class="confirm_btn" style="padding-top: 10px" :disabled="turnConfirm == false">
            {{ $t("buttons.submit") }}
          </button>
        </div>
      </v-form>
      <router-link to="/auth/:auth/login" class="login_route">
        <span>{{ $t("misc.Have Account") }} ? </span
        ><span> {{ $t("buttons.signIn") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>



import { mapGetters } from "vuex";



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
    show1: false,
    show2: false,

    password: "Password",
    ex11: [
      
    ],
    turnConfirm:false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 6 || "Min 6 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    form: {
      username: null,
      email: null,
      phone: null,
      password: null,
      confirm_password: null,
    },
  }),
  methods: {
    handleSubmit() {
      const form = new FormData();
      form.append("username", this.form.username);
      form.append("email", this.form.email);
      form.append("phone", this.form.phone);
      form.append("password", this.form.password);

      this.axios({
        method: "POST",
        url: "auth/:auth/signup",
        data: form,
      })
        .then(() => {
          localStorage.setItem("phone_number", this.form.phone);

          this.$toast.success(`You register Successfully`);
          this.$router.push("/auth/:auth/phone-verification");
        })
        .catch(() => {
          this.$toast.error("خطأ");
        });
    },
    confirmation(){
      this.turnConfirm = ! this.turnConfirm
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
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
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h3 {
    color: #8d8d8d;
    font-size: 20px;
    text-align: center;
  }
  .v-field__field {
    background: white;
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
}
</style>
