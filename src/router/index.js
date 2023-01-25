import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/call",
    name: "call",

    component: () => import("../views/CallView.vue"),
  },
  {
    path: "/all_Latests",
    name: "all_Latests",

    component: () => import("@/components/Latest/AllLatests.vue"),
  },
  {
    path: "/all_acutions",
    name: "all_acutions",

    component: () => import("@/components/acutions/AllAcutions.vue"),
  },

  {
    path: "/search-result",
    name: "search-result",

    component: () => import("@/views/SearchResult.vue"),
  },

  {
    path: "/Product-Details/:id",
    name: "ProductDetails",
    component: () => import("@/components/products/ProductDetails.vue"),
    props: true,
  },

  {
    path: "/packages",
    name: "packages",
    component: () => import("@/views/AllPackages.vue"),
  },

  {
    path: "/packages/:id",
    name: "SelectedPackage",
    component: () => import("@/components/OurPackages/SelectedPackage.vue"),
    props:true
  },


  {
    path: "/create-adveristment",
    name: "CreateAdveristment",

    component: () => import("@/components/CreateAdveristment.vue"),
  },

  {
    path: "/publishments",
    name: "publishments",
    component: () => import("@/views/UserInformation/MyPublichment.vue"),
  },
  {
    path: "/my-auctions",
    name: "my-auctions",

    component: () => import("@/views/UserInformation/MyAuctions.vue"),
  },
  {
    path: "/faqs",
    name: "faqs",

    component: () => import("@/views/UserInformation/FQues.vue"),
  },
  {
    path: "/terms",
    name: "terms",

    component: () => import("@/views/UserInformation/TermsPage.vue"),
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",

    component: () => import("@/views/UserInformation/PrivacyPolicy.vue"),
  },

  {
    path: "/chat",
    name: "chat",

    component: () => import("@/views/UserInformation/ChatPage.vue"),
  },

  {
    path: "/chat/:Product_id/:Sender_id",
    name: "SingleChat",
    component: () => import("@/views/UserInformation/SingleChat.vue"),
    props: true,
  },

  {
    path: "/wishlist",
    name: "wishlist",

    component: () => import("@/views/UserInformation/WishListPage.vue"),
  },

  //auth

  {
    path: "/auth/:auth",
    component: () => import("@/views/auth/AuthHome.vue"),
    props: true,
    children: [
      {
        path: "",
        name: "auth",
        component: () => import("@/views/auth/AuthMethod.vue"),
      },
      {
        path: "register",
        name: "register",

        component: () => import("@/views/auth/AuthRegister.vue"),
      },

      {
        path: "login",
        name: "login",

        component: () => import("@/views/auth/AuthLogin.vue"),
      },
      {
        path: "reset-password-phone-number",
        name: "reset-password-phone-number",

        component: () => import("@/views/auth/ForgetPassword.vue"),
      },
      {
        path: "phone-verification",
        name: "phone-verification",

        component: () => import("@/views/auth/PhoneVerification.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",

        component: () => import("@/views/auth/ResetPassword.vue"),
      },
    ],
  },

  {
    path: "/edit-profile",
    name: "edit-profile",

    component: () => import("@/views/auth/EditProfile.vue"),
  },

  // Category

  {
    path: "/CategoryDetails/:id",
    name: "CategoryDetails",

    component: () => import("@/components/categories/CategoryDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
