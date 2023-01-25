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
      <h1 style="font-family: Cairo-Bold">{{ $t("misc.login account") }}</h1>
      <h3>{{ $t("misc.details log in") }}</h3>
    </div>
    <div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="handleLogin"
      >
        <v-text-field
          v-model="form.username"
          :label="$t('placeholder.userName')"
          required
        ></v-text-field>

        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          :label="$t('placeholder.password')"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="show2 = !show2"
          v-model="form.password"
        ></v-text-field>
        <div class="forget_password">
          <router-link to="/auth/:auth/reset-password-phone-number">
            {{ $t("headers.Forget Your Password?") }}
          </router-link>
        </div>
        <div class="button_div">
          <button type="submit" class="confirm_btn">
            {{ $t("buttons.signIn") }}
          </button>
        </div>
        <router-link to="/auth/:auth/register" class="login_route">
          <span> {{ $t("misc.Have An Account?") }}</span
          ><span> {{ $t("buttons.signUp") }}</span>
        </router-link>
      </v-form>
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

    show2: true,

    password: "Password",

    ex11: [
    
    ],

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },

    form: {
      username: null,
      password: null,
    },
  }),
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },
  methods: {
    handleLogin() {
      const myData = new FormData();

      myData.append("username", this.form.username);
      myData.append("password", this.form.password);

      myData.append(
        "device_token",
        "fDx-Ei9JAqw:APA91bGXMYyQnQWVI5Fhacc30qNAfx5Ev4tYp7_8hbUQCi8h55LL4aEVbTAKZ4FMEFq79OCykOrcauufdo7DLtiE-Mqi8_jWlZDCHBEQZ41QIJXa0mFPVWQmttgWKn6TnWpJg71X_zcW"
      );
      myData.append("type", "android");

      this.axios({
        method: "POST",
        url: "auth/login",
        data: myData,
      })
        .then((response) => {
          this.$store.commit("AuthModules/setCurrentUserData", {
            token: response.data.data.token,
            email: response.data.data.email,
            name: response.data.data.username,
          });
          localStorage.setItem("password", this.form.password);
          this.$toast.success(`You Login Successfully`);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(error.response.data.message);
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
  .forget_password {
    a {
      // margin-block: 7px;
      text-decoration: none;
      display: block;
      text-align: center;
      font-size: 18px;
      font-family: Cairo-Medium !important;
      color: #fa4248;
    }
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
  h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  h3 {
    color: #8d8d8d;
    font-size: 20px;
    text-align: center;
  }
  .v-icon {
    color: #6c98a2;
    font-size: 23px;
  }
  .v-field--variant-filled .v-field__outline::before {
    color: #ccc;
  }
}
</style>
