<template>
  <div>
    <head-card />
    <div class="page_content">
      <div class="vue_map">
        <iframe
          id="inlineFrameExample"
          title="Inline Frame Example"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
        >
        </iframe>
        <div class="overlay"></div>
      </div>
      <div class="contact_content">
        <div class="info_content">
          <h4> {{ $t('misc.Stay in touch with us') }}</h4>
          <v-row>
            <v-col class="col_div" cols="12" lg="4" md="4" xs="12">
              <v-icon icon="mdi-map-marker-outline" /> <br />
              <span>الإمارات العربية المتحدة دبي</span>
            </v-col>
            <v-col class="col_div" cols="12" lg="4" md="4" xs="12">
              <v-icon icon="mdi-whatsapp" /> <br />
              <span>971509033902</span>
            </v-col>
            <v-col class="col_div" cols="12" lg="4" md="4" xs="12">
              <v-icon icon="mdi-gmail" />
              <br />
              <span>info@speed4ever.com</span>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadCard from "@/components/HeadCard.vue";
export default {
  components: { HeadCard },
};
</script>

<style lang="scss">
.page_content {
  position: relative;

  .vue_map {
    .overlay {
      background-color: #bbbbbba1;
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    #inlineFrameExample {
      width: 100%;
      height: 500px;
    }
  }
  .contact_content {
    left: 18%;
    top: 28%;
    width: 65%;
    height: 271px;
    position: absolute;
    background: #f7f5ef;
    z-index: 3;
    border-radius: 20px;
    // height: 250px;
    .info_content {
      padding: 35px;
    }

    margin: auto;
    h4 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgb(0 0 0 / 79%);
      font-weight: bold;
      font-size: 29px;
      margin-bottom: 50px;
      font-family: Cairo-Bold;
    }
    .col_div {
      text-align: center;
      .v-icon {
        font-size: 45px;
        color: #313131;
        margin-bottom: 23px;
      }
      span {
        font-family: Cairo-SemiBold !important;
      }
    }
  }
}

@media (max-width: 960px) {
  .contact_content {
    width: 66% !important;
    height: 450px !important;
    top: 3% !important;
    left: 0;
    right: 16%;

    h4 {
      margin-bottom: 25px !important;
      font-size: 20px !important;
    }
    .v-icon {
      margin-bottom: 10px !important;
    }
  }
}
</style>
