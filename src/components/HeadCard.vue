<template>
  <section class="offer containBK">
    <div>
      <img
        class="imgBK"
        src="https://www.speed4ever.com/img/breadcrumb_bg.9fdb96ff.png"
        alt=""
      />
    </div>
    <div class="heads">
      <h3>{{ showurl() }}</h3>
      <ul>
        <li>
          <router-link to="/">{{ $t("navs.home") }}</router-link>
        </li>
        <li >
          <v-icon icon="mdi-chevron-left" class="icon_left" v-if="$i18n.locale == 'ar'"/>
          <v-icon icon="mdi-chevron-right" class="icon_right" v-else />
        </li>
 
        <li style="margin:0px">{{ showurl() }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      myurl: window.location.pathname,
    };
  },
  methods: {
    showurl: function () {
      this.myurl = this.myurl.replace("/", "");

      // About Us
      if (this.myurl === "about") {
        if (this.$i18n.locale == "ar") {
          var newURL = "من نحن";
        } else {
          newURL = "About Us";
        }
        return newURL;
      }

      // Call Us
      if (this.myurl === "call") {
        if (this.$i18n.locale == "ar") {
          newURL = " اتصل بنا";
        } else {
          newURL = "Call Us";
        }
        return newURL;
      }

      // auctions

      if (this.myurl === "all_acutions") {
        if (this.$i18n.locale == "ar") {
          newURL = " كل المزادات";
        } else {
          newURL = "All Auctions";
        }
        return newURL;
      }

      // all_Latests
      if (this.myurl === "all_Latests") {
        if (this.$i18n.locale == "ar") {
          newURL = "كل المنتجات";
        } else {
          newURL = "All Products";
        }
        return newURL;
      }

// all packages      

      if (this.myurl === "packages") {
        if (this.$i18n.locale == "ar") {
          newURL = " الباقات ";
        } else {
          newURL = "packages";
        }
        return newURL;
      }

// create Ads      

      if (this.myurl === "create-adveristment") {
        if(this.$i18n.locale == 'ar'){
         newURL = " إضافة إعلان ";
        }
        else{
          newURL = "Create Ads";
        }
        return newURL;
      }



// Publishments      
      if (this.myurl === "publishments") {
        if(this.$i18n.locale == 'ar'){
         newURL = " إعلاناتي  ";
        }
        else{
          newURL = "Publishments";
        }
        return newURL;
      }


// My Auctions      

      if (this.myurl === "my-auctions") {
        if(this.$i18n.locale == 'ar'){
         newURL = "  مزاداتي ";
        }
        else{
          newURL = "My Auctions";
        }
        return newURL;
      }


// FAQs
      
      if (this.myurl === "faqs") {
        if(this.$i18n.locale == 'ar'){
         newURL = "  الأسئلة الشائعة ";
        }
        else{
          newURL = "FAQs";
        }
        return newURL;
      }


// privacy policy


      if (this.myurl === "privacy-policy") {
        if(this.$i18n.locale == 'ar'){
         newURL = "  سياسة الخصوصية ";
        }
        else{
          newURL = "Privacy Policy ";
        }
        return newURL;
      }

// terms

if (this.myurl === "terms") {
        if(this.$i18n.locale == 'ar'){
         newURL = " الشروط و الأحكام ";
        }
        else{
          newURL = "Terms and Conditions  ";
        }
        return newURL;
      }

// chats

      if (this.myurl === "chat") {
        if(this.$i18n.locale == 'ar'){
         newURL = " المحاداثات";
        }
        else{
          newURL = " Chats";
        }
        return newURL;
      }


// wishlist

      if (this.myurl === "wishlist") {
        if(this.$i18n.locale == 'ar'){
         newURL = "  المفضلة ";
        }
        else{
          newURL = "Wishlist";
        }
        return newURL;
      }


// edit porofile

      if (this.myurl === "edit-profile") {
        if(this.$i18n.locale == 'ar'){
         newURL = "  حسابي ";
        }
        else{
          newURL = "My Account";
        }
        return newURL;
      }



// search result
      if (this.myurl === "search-result") {
        if(this.$i18n.locale == 'ar'){
         newURL = "  نتائج البحث ";
        }
        else{
          newURL = "Search Results";
        }
        return newURL;
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.offer {
  position: relative;
  overflow: hidden;
  font-family: "Cairo-Bold", sans-serif;

  height: 158px;
  // overflow: hidden;
  // margin-top: 10px;

  // margin-bottom: 40px;

  .heads {
    text-align: center;
    margin: auto;
    width: 100%;
    padding: 20px 0;
    h3 {
      font-size: 27px;
      font-family: Cairo-Bold;
      font-style: normal;
    }
    ul {
      overflow: hidden;
      font-family: Cairo-Regular;
      li {
        margin: 0;
        margin-right: 7px;
        font-size: 15px;
        font-weight: 100;

        &:first-of-type {
          font-weight: 700;
        }
        &:last-of-type {
          color: rgb(156, 155, 155);
          margin-top: 3px;
        }
      }
    }
    .icon_left {
      color: #504e4eb3;
      font-size: 23px;
    }
    a {
      cursor: pointer;
      color: var(--vt-c-volite);
    }
  }
}

@media (max-width: 900px) {
  .heads .offer .heads {
    h3 {
      font-size: 30px;
      width: 100%;
    }
    li {
      margin-right: 5px;
      font-size: 14px;
    }
  }
}
@media (max-width: 690px) {
  .offer .heads li {
    padding: 0;
  }
}
@media (max-width: 560px) {
  .offer .heads  {
    text-align: start;
    padding: 8px 0;
    h3{
      text-align: center;
      font-size: 20px;
    }
    ul{
      column-gap: 43px;
    justify-items: center;
    li {
      // width: 100%;
    }
    }
  }
}
</style>
