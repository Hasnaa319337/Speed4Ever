<template>
  <div>
    <header>
      <!-- hidden navbar -->
      <transition>
        <div class="overlay" @close="hideSideNav" v-if="sideNavIsVisable">
          <div class="close" @click="hideSideNav"></div>
          <div class="list">
            <ul class="list">
              <li>
                <router-link to="/">{{ $t("navs.home") }}</router-link>
              </li>
              <li>
                <router-link to="/about"> {{ $t("navs.aboutUs") }}</router-link>
              </li>
              <li v-if="currentUser.token">
                <router-link to="/packages">{{
                  $t("navs.Packages")
                }}</router-link>
              </li>
              <li>
                <router-link to="/call">
                  {{ $t("navs.contactUs") }}</router-link
                >
              </li>
              <li v-if="currentUser.token">
                <router-link to="/create-adveristment">{{
                  $t("navs.addads")
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </transition>

      <!-- shown navbar -->
      <v-container style="padding: 0">
        <div class="contain">
          <div class="logo">
            <router-link to="/">
              <img src="@/assets/images/logo.bb997692.svg" />
            </router-link>
          </div>

          <nav>
            <ul class="list" style="margin-bottom: 0 !important">
              <li>
                <router-link to="/">{{ $t("navs.home") }}</router-link>
              </li>
              <li>
                <router-link to="/about"> {{ $t("navs.aboutUs") }}</router-link>
              </li>
              <li v-if="currentUser.token">
                <router-link to="/packages">{{
                  $t("navs.Packages")
                }}</router-link>
              </li>
              <li>
                <router-link to="/call">
                  {{ $t("navs.contactUs") }}</router-link
                >
              </li>
              <li v-if="currentUser.token">
                <router-link to="/create-adveristment">{{
                  $t("navs.addads")
                }}</router-link>
              </li>
            </ul>
          </nav>
          <div class="buttons" v-if="!sideNavIsVisable">
            <router-link
              to="/auth/:auth"
              class="auth_button"
              v-if="!currentUser.token"
            >
              {{ $t("buttons.sign now") }}
            </router-link>

            <button @click="showSearch">
              <v-icon icon="mdi-magnify" />
              <span>{{ $t("placeholder.SearchNow") }}</span>
            </button>

            <button v-if="currentUser.token">
              <v-icon icon="mdi-bell-outline" />
              <span>{{ $t("placeholder.Notification") }}</span>
            </button>
            <router-link to="/chat" v-if="currentUser.token">
              <button>
                <v-icon icon="mdi-chat-processing-outline" />
                <span>{{ $t("placeholder.chats") }}</span>
              </button>
            </router-link>

            <router-link to="/wishlist" v-if="currentUser.token">
              <button>
                <v-icon icon="mdi-cards-heart-outline" />
                <span>{{ $t("placeholder.fav") }}</span>
              </button>
            </router-link>

            <button v-if="currentUser.token" @click="visibleRight = true">
              <v-icon icon="mdi-account-outline" />
              <span>{{ $t("placeholder.profile") }}</span>
            </button>
          </div>

          <LanguageSelect />
          <a class="bars" @click="showSideNav"
            ><img src="@/assets/images/menu_FILL0_wght400_GRAD0_opsz48.png"
          /></a>
        </div>
      </v-container>

      <div
        class="search_content"
        @close="hideSearch"
        v-if="searchIsVisable"
        data-aos="fade-in"
        data-aos-offset="200"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
      >
        <button class="close_btn" @click="hideSearch">
          <v-icon icon="mdi-close" />
        </button>

        <div class="row justify_content">
          <div class="package_form">
            <v-form @submit.prevent="searchForm">
              <div class="input_div">
                <input
                  type="text"
                  :placeholder="$t('placeholder.Search Here')"
                  class="form-control"
                  style="background-color: transparent; border: none"
                  v-model="keyword"
                />
                <button type="submit"><v-icon icon="mdi-magnify" /></button>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </header>
    <SidebarComp
      v-model:visible="visibleRight"
      :baseZIndex="10000"
      position="right"
    >
      <div class="user_header">
        <div class="avater"><img :src="image" alt="user_image" /></div>
        <div class="name">
          <h4>{{ user_name }}</h4>
          <router-link to="/edit-profile" @click="visibleRight = false"
            ><v-icon icon="mdi-pencil-outline"
          /></router-link>
        </div>
      </div>
      <div class="profile_settings">
        <ul>
          <li v-for="item in items" :key="item">
            <router-link :to="item.src" @click="visibleRight = false">
              <v-icon :icon="item.icon" />
              <span>{{ item.$('text') }}</span>
            </router-link>
          </li>
          <li>
            <v-icon icon="mdi-logout" @click="visibleRight = false" />
            <button @click="logout">{{ $t("buttons.logout") }}</button>
          </li>
        </ul>
      </div>
    </SidebarComp>
  </div>
</template>

<script>
import LanguageSelect from "./buttons/LanguageSelect.vue";
import { mapGetters } from "vuex";

export default {
  props: ["notRegister"],
  components: { LanguageSelect },
  data() {
    return {
      sideNavIsVisable: false,
      searchIsVisable: false,
      checkClick: false,
      myWidth: "170",
      searchValue: "",
      keyword: null,
      visibleRight: false,
      items: [
        {
          src: "/publishments",
          text: "buttons.ads",
          icon: "mdi-mailbox",
        },
        { src: "/my-auctions", text: "مزاداتي", icon: "mdi-gavel" },
        { src: "/faqs", text: "الأسئلة الشائعة", icon: "mdi-help" },
        {
          src: "/privacy-policy",
          text: "سياسة الخصوصية",
          icon: "mdi-file-document-outline",
        },
      ],
      image: null,
      user_name: null,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
    position() {
      if (this.$i18n.locale == "ar") {
        return "left";
        // console.log('left');
      } else {
        return "right";
        // console.log('right');
      }
    },
  },

  methods: {
    logout() {
      this.$store.commit("AuthModules/Logout");
      this.$toast.success(`You Logout Successfully`);
    },
    showSideNav() {
      this.sideNavIsVisable = true;
    },
    hideSideNav() {
      this.sideNavIsVisable = false;
    },
    showSearch() {
      this.searchIsVisable = true;
    },
    hideSearch() {
      this.searchIsVisable = false;
    },

    searchForm() {
      this.$store.dispatch("searchForm", this.keyword);
      this.searchIsVisable = false;
      this.keyword = null;
    },

    getProfileData() {
      this.axios({
        method: "GET",
        url: "profile",
      })
        .then((res) => {
          this.image = res.data.data.image;
          this.user_name = res.data.data.username;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getProfileData();
  },
};
</script>
<style lang="scss" scoped>
header {
  position: relative;
  // overflow: hidden;
  font-family: "Cairo-Bold", sans-serif;

  /* background-image: linear-gradient(45deg, #fefefe, #52004a); */
}
.display_none {
  display: none;
}
.contain {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0;
  height: 100px;
}
.logo {
  cursor: pointer;
}
.logo img {
  object-fit: cover;
  width: 100px;
}
router-link {
  text-transform: uppercase;
  transition: all 0.3s linear;
  cursor: pointer;
}

.list {
  a {
    position: relative;

    &:hover {
      color: #313131;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -13px;
      left: 0%;
      display: block;
      height: 2px;
      width: 0%;
      background-color: none;
      border-radius: 8px;
      transition: all 0.4s ease-in-out;
      z-index: -20;
    }
    &:hover::after,
    &:active::after {
      transition: all 0.4s ease-in-out;
      background-color: black;
      width: 100%;
    }
  }
  .router-link-active {
    color: #6c98a2 !important;
    &::after {
      left: 0;
      transition: all 0.4s ease-in-out;
      background-color: black;
      width: 100%;
    }
  }
}

.list li {
  font-size: 14px !important;
}
.buttons {
  display: flex;
  align-items: center;
  column-gap: 15px;
  justify-items: center;
}
.search_icon {
  text-decoration: none;
  color: rgb(85, 85, 85);
}
.auth_button {
  text-decoration: none;
  position: relative;
  display: inline-block;
  width: 150px;
  text-align: center;
  margin-top: 30px;
  padding: 5px 20px;
  font-size: 20px;
  font-family: Cairo-SemiBold;

  background-image: linear-gradient(
    90deg,
    transparent 50%,
    var(--main_theme_clr) 0
  );
  background-position: 100%;
  background-size: 400%;

  border-radius: 35px;
  transition: all 0.6s ease-in-out;
  margin: 0;
  font-size: 14px;

  width: max-content;
  color: #313131;
  background-image: linear-gradient(90deg, transparent 50%, #fbf9f4 0);
  border: 1px solid #fbf9f4;

  &:hover {
    background-position: 0;
    background-color: white;
  }
}

.search-form {
  position: relative;
  margin-right: 10px;
}

.headerSearch {
  transform: scaleX(1.03);
  height: 50px;
  transition: 0.3s all ease-in-out;
}

.bars {
  cursor: pointer;
  display: none;
}

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #000000bf;
  z-index: 100;
  display: none;
}

.close {
  z-index: 1;
  position: relative;
  width: 22px;
  height: 28px;
  margin: 20px 20px 0 auto;
  text-align: right;
  font-style: initial;
  letter-spacing: initial;
  font-weight: initial;
  display: block;
  cursor: pointer;
  color: #fff;
}
.close::before {
  content: "\2715";
  font-size: 28px !important;
}
.close:hover {
  animation: closeAnimation ease-in-out 0.8s;
  color: var(--vt-c-volite);
  transition: 0.3s all ease-in-out;
}

.v-enter-from {
  transform: translatex(-50px);
}
.v-enter-active {
  transition: 0.3s ease-out;
}
.v-enter-to {
  transform: translatex(0);
}
.v-leave-from {
  transform: translatex(0);
}

.v-leave-active {
  transition: 0.3s ease-in;
}
.v-leave-to {
  transform: translatex(-50px);
}

@media (max-width: 1200px) {
  .overlay {
    display: block;
    backdrop-filter: blur(5px);
  }
  .buttons {
    display: none;
  }
  .contain {
    justify-content: flex-start !important;
    text-align: center;
  }
  .bars {
    display: block;
  }
  .list {
    text-align: center;
    margin: auto;
    margin-top: 1.5rem;
  }
  ul {
    list-style: none;
  }
  li {
    font-size: 1.3rem;
    padding: 15px 0;
    display: block;
    width: 100%;
  }
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    cursor: pointer;
    color: #a1a1a1;
  }
  .contain nav .list {
    display: none;
  }
}
.buttons {
  button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;

    line-height: 1.5;

    position: relative;
    display: inline-block;

    span {
      position: absolute;
      // bottom: -35px;
      left: 0;
      right: 0;

      width: max-content;
      padding: 0 8px;
      font-size: 14px;
      font-family: Cairo-Medium;
      background-color: #f7f5ef;
      color: #313131;
      box-shadow: 0 0 10px 2px hsl(0deg 0% 88% / 30%);
      border-radius: 8px;
      z-index: 10;
      transition: all 0.3s ease-in-out;
      transform-origin: top;
      transform: scale(0);
      display: none;
      // opacity: 0;
    }
    &:hover > span {
      transform: scale(1);
      display: block;
      // opacity: 1;
      right: -9px;
      top: 40px;
      transition: all 0.3s ease-in-out;
    }
  }
}

@media (max-width: 760px) {
  .bars img {
    width: 35px;
    // margin-left: 25px;
    height: 45px;
  }
}
@media (max-width: 1200px) {
  a {
    margin-left: 0 !important;
  }
  nav {
    display: none;
  }
  .contain {
    display: grid;
    grid-template-columns: repeat(3, 33% 33% 33%);
    .logo {
      margin: auto;
    }
    .bars {
      margin: auto;
      width: 50%;
    }
 
  }
}

// search block

.search_content {
  position: absolute;
  inset: 0;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  // display: none;
  transition: 0.3s all ease-in-out;

  .justify_content {
    justify-content: center !important;
    font-family: Cairo-Regular;
    width: 100% !important;
  }

  .close_btn {
    position: absolute;
    top: 35px;
    left: 40px;
    color: #fff;
    transition: all 0.4s ease-in-out;
    font-size: 20px;

    &:focus {
      .search_content {
        display: block;
      }
    }

    &:hover {
      transform: rotate(180deg);
      transform-origin: center;
      color: #fa4248;
    }
  }
  .package_form {
    width: 55%;
    .input_div {
      margin-block: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #f3f3f3;
      background-color: transparent;
      input {
        text-align: center;
        width: 90%;
        font-size: 30px;
        color: #fff;
        text-align: center;
        &::placeholder {
          text-align: center;
        }
      }
      button {
        font-size: 35px;

        padding: 0;
        margin: 0;
        color: #f3f3f3;
        font-size: 30px;
      }
    }
  }
}
</style>
