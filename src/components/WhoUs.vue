<template>
  <div class="who_us">
    <v-container class="my_container">
      <v-row>
        <v-col cols="12" lg="10" md="10" xs="12">
          <div class="about_contain">
            <h3>{{ $t("navs.aboutUs") }}</h3>
            <div class="about_text">
              <div v-html="info" class="info"></div>
            </div>

            <router-link to="/about" class="main_btn" style="width: 85%">
              <span>{{ $t("buttons.Learn more") }}</span>
              <!-- direction rtl -->
              <span v-if="$i18n.locale == 'ar'">
                <v-icon icon="mdi-arrow-left-thin"
              /></span>

              <!-- dirction ltr -->
              <span v-else> <v-icon icon="mdi-arrow-right-thin" /></span>
            </router-link>
          </div>
        </v-col>
        <v-col cols="12" lg="2" md="2" xs="12">
          <div class="image">
            <v-img src="https://www.speed4ever.com/img/about.39f2fc6d.png" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      info: null,
    };
  },

  methods: {
    aboutData() {
      this.axios({
        method: "GET",
        url: "about",
      })
        .then((res) => {
          this.info = res.data.data.about;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.aboutData();
  },
};
</script>

<style lang="scss" scoped>
.who_us {
  margin: 50px 0;
  .my_container {
    position: relative;

    .about_contain {
      background: #f7f5ef;
      height: 400px;
      padding: 20px 40px;
      border-radius: 20px;
      h3 {
        font-size: 25px;
        color: #313131;
        margin-bottom: 40px;
        font-family: Cairo-Bold;
      }
      .about_text {
        p {
          margin-bottom: 16px;
          font-size: 16px;
          font-family: "Cairo-Regular";
        }
      }
      a {
        width: 134% !important;
        margin-top: 30px;
      }
    }
    .image {
      position: absolute;
      left: 50px;
      top: 50%;
      transform: translateY(-50%);
      width: 400px;
      height: 300px;

      overflow: hidden;
      img {
      }
    }
  }
}

@media (max-width: 1200px) {
  .image {
    position: absolute !important;
    left: 0 !important;
    top: 15% !important;
    transform: translateY(0) !important;
  }
}
@media (max-width: 1110px) {
  .about_contain {
    height: 300px !important;
  }
  .image {
    width: 300px !important;
    height: 500px !important;
    position: absolute !important;
    left: 0 !important;
    top: 14% !important;
    transform: translateY(0) !important;
  }
}
@media (max-width: 960px) {
  // .about_contain{
  //     height: 300px !important;
  // }
  .image {
    position: relative !important;
    left: 0 !important;
    top: 15% !important;
    width: 415px !important;
    height: 400px !important;
    transform: translateY(0) !important;
    margin: auto;
  }
}
@media (max-width: 560px) {
  a {
    margin-left: -340px !important;
  }
}

.who_us .v-row {
  direction: ltr !important;
  .image {
    right: 0 !important;
  }
}
</style>
