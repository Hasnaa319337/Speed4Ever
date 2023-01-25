<template>
  <div>

    <div class="lang_and_currency">
      <div class="lang">
        <template v-if="$i18n.locale == 'ar'">
          <button @click="changeLocale">
            <img
              src="https://www.speed4ever.com/img/en.23a2323c.png"
              width="35"
    
            />
          </button>
        </template>
        <template v-if="$i18n.locale == 'en'">
          <button @click="changeLocale">
            <img
              src="https://www.speed4ever.com/img/ar_uae.e41477bc.webp"
              width="35"
            />
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "LanguageSelect",
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
    changeLocale() {
      if (this.$i18n.locale == "ar") {
        Cookies.set("locale", "en");
        window.location.reload();
      }
      if (this.$i18n.locale == "en") {
        Cookies.set("locale", "ar");
        window.location.reload();
      }
    },
  },
};
</script>

<style >

.lang_and_currency .lang{
      margin: auto;
      width: 17%;
    }
</style>
