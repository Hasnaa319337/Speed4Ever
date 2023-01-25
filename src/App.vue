<template>
  <div :class="$i18n.locale == 'ar' ? 'is-rtl' : 'is_ltr'">
    <the-header v-if="!$route.params.auth"></the-header>
    <!-- v-if="myurl ==='/auth' " -->

    <main>
      <router-view
        data-aos="fade-in"
        data-aos-offset="200"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
      ></router-view>
    </main>

    <the-footer v-if="!$route.params.auth"></the-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

import i18n from "./i18n";
export default {
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      myurl: this.$route.path,
    };
  },
  mounted() {
    // AOS.init({
    //   // Global settings:
    //   offset: 120, // offset (in px) from the original trigger point
    //   delay: 300, // values from 0 to 3000, with step 50ms
    //   duration: 500, // values from 0 to 3000, with step 50ms
    //   easing: "ease-in-out", // default easing for AOS animations
    //   once: true, // whether animation should happen only once - while scrolling down
    //   anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    // });

    if (i18n.global.locale == "en") {
      document.body.dir = "ltr";
    } else {
      document.body.dir = "rtl";
    }
  },
};
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
// #app {
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
//   outline: none;
// }

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.profile_drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  font-family: Cairo-Regular;
}
.profile_content {
  background-color: #fbf9f4;
  padding: 20px;
  margin: 0;
  list-style: none;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 30%;
  max-width: 30%;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.2s;
}
.user_header {
  display: flex;
  align-items: center;
  // justify-content: flex-start;
  column-gap: 20px;

  .avater {
    width: 130px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .name {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    width: 100%;

    h4 {
      color: #313131;
      font-family: Cairo-Bold;
      font-size: 25px;
    }
    a {
      background: rgba(204, 204, 204, 0.1607843137);
      font-size: 20px;
      border-radius: 8px;
      margin: 5px;
      padding: 7px;
      color: rgba(0, 0, 0, 0.6509803922);
    }
  }
}
.profile_settings {
  font-family: Cairo-SemiBold;

  ul {
    overflow: hidden;
    li {
      float: none;
      margin: 0;
      font-size: 18px;

      span {
        color: #313131;
        font-size: 18px;
        margin: 5px;
      }
      .v-icon {
        background: #cccccc29;

        border-radius: 8px;
        margin: 5px;
        padding: 21px;
        color: #000000a6;
      }
    }
  }
}
.p-sidebar-right .p-sidebar {
  width: 25rem !important;
}

.p-sidebar-mask {
  background: #212529f2 !important;
}
//Arabic

.is-rtl {
  nav {
    .list {
      li {
        float: right;

        &:last-of-type {
          margin-right: 20px;
        }
      }
    }
  }
  // carousal
  .carousel-inner {
    border-top-left-radius: 40px !important;
    border-bottom-left-radius: 40px !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .active_btn span {
    right: 3%;
    left: auto;
  }

  @media (max-width: 1400px) {
    .active_btn span {
      right: 4% !important;
      left: auto;
    }
  }
  @media (max-width: 1000px) {
    .active_btn span {
      right: 6% !important;
      left: auto;
    }
    
  }
  @media (max-width: 800px) {
    .active_btn span {
      right: 8% !important;
      left: auto;
    }
    
  }
  @media (max-width: 550px) {
    .active_btn span {
      right: 10% !important;
      left: auto;
    }
    
  }
  // pagination

  // whoUs

  .who_us {
    .v-row {
      direction: rtl !important;

      .image {
        left: 0;
        top: 50%;
        right: auto !important;
      }
    }
  }
}

// English

.is_ltr {
  .socials {
    right: 0;
    left: auto !important;
  }

  .form_title {
    h3 {
      font-size: 18px;
      text-align: center;
      width: 58%;
    }
  }
  .transiction_input {
    direction: ltr;
  }
}

.main_btn {
  display: flex;
  align-items: center;
  justify-content: center;

  column-gap: 12px;
  color: rgba(0, 0, 0, 0.747);
  font-family: Cairo-Regular;
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0;

  &:hover {
    color: rgba(0, 0, 0, 0.747);
  }
}

.product_card {
  position: relative;
  width: 300px;
  margin-block: 15px;
  border-radius: 15px;
  box-shadow: 0 0 10px 2px #e1e1e199;
  font-family: Cairo-Regular;
  direction: rtl;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    object-position: top;
    border-radius: 15px;
  }
  .product_details {
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 10px;

    .product_name {
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
    .brand_name {
      margin-block: 0;
      text-align: start;
      font-size: 16px;
      font-family: Cairo-SemiBold;
      color: #8d8d8d;
    }
    .price_and_btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .product_price {
        display: flex;
        align-items: center;
        justify-content: center;

        column-gap: 10px;
        font-family: Cairo-Bold;

        .price_without_sale {
          font-size: 16px;
          color: #313131;
          .price {
            margin: 0 5px;
          }
          .currency {
          }
        }
      }
      .card_btns {
        position: relative;
        display: flex;

        column-gap: 8px;
        font-size: 22px;
        margin-left: 15px;

        .share_btn {
          font-size: 18px;
        }
        .wishlist_btn {
        }
      }
    }
  }

  .acutions {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    flex-wrap: wrap;
    font-size: 16px;
    color: #313131;

    .acution_time,
    .number,
    .money {
      display: flex;
      align-items: center;
      justify-content: center;

      column-gap: 8px;
    }
  }
  .acution_time {
    width: 100% !important;
    margin: 15px 0;
    font-family: Cairo-SemiBold;
  }
}

.package_card {
  margin-block: 0;
  width: 35%;
  row-gap: 15px;
  background-color: #f7f5ef;
  border: none;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  color: #313131 !important;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  font-family: Cairo-SemiBold;

  padding: 17px 0;

  &:hover {
    background-color: #6c98a2;
    transform: scale(1.06);
    color: white !important;
    border: 2px solid #6c98a2;
  }

  .package_title {
    font-size: 20px;
  }

  .package_desc {
    font-size: 28px;
  }
  .package_remaining_time {
    font-size: 20px;
  }
}
</style>
