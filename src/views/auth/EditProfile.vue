<template>
  <div>
    <HeadCard />

    <div class="form-content">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        fluid
        @submit.prevent="editPorfile"
      >
        <div class="image_div">
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="previewImage"
            class="form-control-file"
            id="add_img"
          />
          <label for="add_img">
            <img :src="image" class="img-fluid" />

            <v-icon icon="mdi-pencil-outline"
          /></label>
        </div>
        <v-text-field
          v-model="form.username"
          :counter="10"
          :rules="nameRules"
          :placeholder="$t('placeholder.userName')"
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          :placeholder="$t('placeholder.emailAddress')"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="form.phone"
          :counter="11"
          :error-messages="errors"
          :placeholder="$t('placeholder.phone')"
          type="tel"
        ></v-text-field>

        <v-switch
          v-model="ex11"
          :label="$t('placeholder.edit password')"
          @click="showMoreMethod"
          color="rgb(108 152 162)"
          value="rgb(108 152 162)"
          hide-details
          style="margin-bottom: 30px"
        ></v-switch>

        <div
          class="input_wrapper collect_divs"
          v-if="showMore"
          style="width: 60%"
        >
          <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            :placeholder="$t('placeholder.current password')"
            hint="At least 6 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            v-model="form.old_password"
          ></v-text-field>
          <v-text-field
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            :placeholder="$t('placeholder.new password')"
            hint="At least 6 characters"
            class="input-group--focused"
            @click:append="show2 = !show2"
            v-model="form.password"
          ></v-text-field>
        </div>

        <div class="button_div">
          <button type="submit" class="confirm_btn">submit</button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import HeadCard from "@/components/HeadCard.vue";

export default {
  data() {
    return {
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
        "red",
        "indigo",
        "orange",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "red darken-3",
        "indigo darken-3",
        "orange darken-3",
      ],
      ex12: [
        "red",
        "indigo",
        "orange",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "red darken-3",
        "indigo darken-3",
        "orange darken-3",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
   
      image: null,
      showMore: false,
      form: {
        username: null,
        email: null,
        phone: null,
        password: null,
        old_password: null,
      },
    };
  },
  methods: {
    previewImage(e) {
      if (e.target.files) {
        this.image={
          file: e.target.files[0],
          src: URL.createObjectURL(e.target.files[0]),
        };
      }
      console.log((this.image.file));
      console.log((this.image.src));
    },
    getProfileData() {
      this.axios({
        method: "GET",
        url: "profile",
      })
        .then((res) => {
          this.image = res.data.data.image;
          this.form.username = res.data.data.username;
          this.form.email = res.data.data.email;
          this.form.phone = res.data.data.phone;
         
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editPorfile() {
      const form = new FormData();
      form.append("image", this.image.file);
      form.append("username", this.form.username);
      form.append("email", this.form.email);
      form.append("phone", this.form.phone);
    

      const passwordForm = new FormData();
      passwordForm.append("old_password", this.form.old_password);
      passwordForm.append("password", this.form.password);

      this.axios({
        method: "POST",
        url: this.showMore ? "editPassword" : "edit_profile",
        data: this.showMore ? passwordForm : form,
      })
        .then(() => {
          this.$toast.success(`You Edit Successfully`);
          this.getProfileData();
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },

    showMoreMethod() {
      this.showMore = !this.showMore;
    },
  },
  components: { HeadCard },

  mounted() {
    this.getProfileData();
  },
};
</script>

<style lang="scss">
.v-form {
  width: 50%;
  font-family: Cairo-Regular;
  margin: 50px auto;
}
.v-field--variant-filled .v-field__outline::before,
.v-field--variant-filled .v-field__outline::after {
  color: rgb(230, 228, 228);
}

.v-field__field {
  background: white;
}

.v-switch {
  font-family: Cairo-SemiBold;
  color: #8d8d8d;
}
.image_div {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  input {
    display: none;
  }
  label {
    position: relative;
  }
  img {
    width: 150px;
    height: 150px;

    object-fit: cover;
    border-radius: 50%;
  }
  .v-icon {
    position: absolute;
    bottom: -20px;
    left: 39%;
    background: #f3f3f3;
    // padding: 5px;
    width: 45px;
    height: 45px;
    font-size: 26px;
    border-radius: 50%;
    z-index: 50;
    color: #313131;
    cursor: pointer;
  }
}
</style>
