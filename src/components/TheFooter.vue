<template>
  <footer>
    <v-container>
      <v-row class="foot-divs">
        <v-col class="socials" cols="12" lg="3" md="12" xs="12">
          <img class="logoImage" src="@/assets/images/logo_dark.fd8e1ced.svg" />

          <p style="font-size: 13px; width: 70%">
            {{ $t("misc.footer text") }}
          </p>
          <a class="email">info@speed4ever.com</a>
          <span class="phone">966599910168</span>
        </v-col>
        <v-col class="info" cols="12" lg="3" md="12" xs="12">
          <h2>{{ $t("misc.Main Sections") }}</h2>
          <ul>
            <!-- <li class="list_item"><a href="">{{ $t('links.help') }}</a></li> -->
            <li class="list_item">
              <router-link to="/faqs">
                {{ $t("links.common questions") }}</router-link
              >
            </li>
            <li class="list_item">
              <router-link to="/privacy-policy">{{
                $t("links.Privacy Policy")
              }}</router-link>
            </li>
            <li class="list_item">
              <router-link to="/terms">
                {{ $t("links.Terms & Condition") }}
              </router-link>
            </li>
            <!-- <li class="list_item"><a href="">  {{ $t('links.Terms Of Use') }} </a></li> -->
          </ul>
        </v-col>
        <v-col class="links" cols="12" lg="3" md="12" xs="12">
          <h2>{{ $t("misc.Important links") }}</h2>
          <ul>
            <li class="list_item">
              <router-link to="/">{{ $t("navs.home") }}</router-link>
            </li>
            <li class="list_item" v-if="currentUser.token">
              <router-link to="/packages"
                >{{ $t("navs.Packages") }}
              </router-link>
            </li>
            <li class="list_item">
              <router-link to="/about">
                {{ $t("navs.aboutUs") }}
              </router-link>
            </li>
            <li class="list_item" v-if="currentUser.token">
              <router-link to="/create-adveristment">{{
                $t("navs.addads")
              }}</router-link>
            </li>
            <li class="list_item">
              <router-link to="/call">
                {{ $t("navs.contactUs") }}
              </router-link>
            </li>
          </ul>
        </v-col>
        <v-col class="letters" cols="12" lg="3" md="12" xs="12">
          <h2>{{ $t("misc.Download Our Mobile App") }}</h2>
          <v-row class="letters_contain">
            <v-col class="mobile_img" cols="12" lg="5"
              ><img src="@/assets/images/app_splash.d407c995.svg"
            /></v-col>
            <v-col cols="12" lg="7">
              <div style="margin: auto">
                <h5>{{ $t("misc.Get Our Offers Only On Our App") }}</h5>
              </div>
              <div class="download-imgs">
                <img src="@/assets/images/google-play.45251520.svg" />
                <img src="@/assets/images/apple-store.689e0e3d.svg" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="copyright">
      <p>Speed4Ever All Rights Reserved Copyright © 2022</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      currentUser: "AuthModules/currentUser",
    }),
  },
};
</script>

<style lang="scss">
footer {
  overflow: hidden;
  background-color: #292626;
  padding-top: 60px;
  color: #ffffff;
  font-family: Cairo-Regular;
  // margin-top: 300px;

  h2 {
    width: max-content;
    margin-bottom: 15px;

    font-size: 22px;

    text-transform: uppercase;
    margin-top: 0;
    font-weight: 500;
  }
  a {
    font-size: 16px;

    font-weight: 400;
    text-transform: uppercase;
    transition: all 0.3s linear;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    float: none;
  }
  ul {
    list-style: none;
    padding-left: 0 !important;

    li {
      padding: 4px 0;
      margin-right: 0 !important;
      float: none;
      text-align: start;
      &:last-of-type {
        margin: 0;
      }
    }
  }
  .socials {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    a {
      text-decoration: none;
      cursor: pointer;
    }
    p {
      margin-bottom: 10px;
    }
    .email {
      font-family: sans-serif;
      font-size: 15px;
      text-transform: lowercase;
    }

    .logoImage {
      margin-left: 20px;
      margin-bottom: 50px;
    }
    .social-images {
      ul {
        padding: 0;
        li {
          margin: 0;
          margin-right: 0 !important;
        }
      }
      img {
        width: 32px;
      }
      img:hover {
        transform: rotate(20deg) scale(1.03);
        transition: 0.3s all ease-in-out;
      }
    }
  }
  .letters {
    h2 {
      border: none;
      font-size: 20px;
      text-align: center;
      width: 100%;
      margin-bottom: 20px;
      font-family: "Cairo-Bold";
    }
    .mobile_img {
      direction: rtl;
    }
    .letters_contain {
      direction: ltr;
      h5 {
        text-align: center;
        direction: rtl;
        font-family: Cairo-SemiBold;
        font-weight: 500;
        font-size: 20px;
        &:first-of-type {
          margin-top: 36px;
        }
        &:last-of-type {
          margin-bottom: 36px;
        }
      }
    }
  }
  .links {
    li {
      float: none;
    }
  }

  .copyright {
    text-align: center;
    padding: 20px 0;

    font-size: 11px;
    a {
      cursor: pointer;
      font-size: 11px;
    }
    a:hover {
      color: #12794e !important;
    }
    p {
      margin: 0;
    }
    img {
      left: 0;
      position: relative;
      display: inline-block;
      top: 0;
    }
  }

  .download-imgs {
    display: flex;
    justify-items: center;

    align-items: center;
    column-gap: 9px;
  }

  @media (max-width: 1400px) {
    .download-imgs {
      .download-imgs img {
        margin-bottom: 10px;
      }
    }
  }

  @media (max-width: 1279px) {
    .letters {
      display: flex;
      align-items: center;
      justify-content: center;
      justify-items: center;
      flex-direction: column;
    }

    .download-imgs {
      justify-content: center;
      display: flex;
    }
    .mobile_img {
      direction: rtl;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-items: center;
    }
  }

  @media (max-width: 1000px) {
    .foot-divs {
      display: flex;
      align-items: center;
      justify-content: center;
      justify-items: center;

      .socials,
      .links,
      .info {
        display: none;
      }
      .letters {
        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
      }
    }
    .download-imgs {
      justify-content: center;
      display: flex;
    }
    .mobile_img {
      direction: rtl;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-items: center;
    }
  }
  a:hover {
  color: #ffc107 !important;
}

.router-link-exact-active{
  color: #6c98a2 !important;
}
}

</style>
