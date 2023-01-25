<template v-if="dataFetched">
  <div>
    <HeadCard />
    <div class="all_packages" v-if="only_chat">
      <!-- Start:: Selected Package -->
      <div class="package_card selected_package">
        <router-link class="package_card selected_package router" to="/">
          <h5 class="package_title">{{ SubscribedPackage.package?.name }}</h5>
          <h3 class="package_desc">
            {{ SubscribedPackage.number_of_products }} {{ $t('misc.monthly') }} 
          </h3>
          <h5 class="package_remaining_time">
            <v-icon icon="mdi-clock-time-four-outline" />
            <span class="remaining_time"
              ><span class="duration"> <span style="margin: 0 5px;">{{ SubscribedPackage.time_remaining?.day }}</span> {{ $t('misc.day') }} </span
              ><span class="duration"><span style="margin: 0 5px;"> {{ SubscribedPackage.time_remaining?.hour }}</span> {{ $t('misc.hour') }} </span
              ><span class="duration"> <span style="margin: 0 5px;">{{ SubscribedPackage.time_remaining?.minute }}</span> {{ $t('misc.minute') }} </span></span
            >
          </h5>
        </router-link>
      </div>

      <!-- End:: Selected Package -->

      <!-- Start:: All Packages -->
      
        <SignalPackage :packages="packages" />

      <!-- End:: All Packages -->
    </div>

 
  </div>
</template>

<script>
import HeadCard from "@/components/HeadCard.vue";
import SignalPackage from "@/components/SignalPackage.vue";

export default {
  components: { HeadCard, SignalPackage },

  data() {
    return {
      packages: null,
      SubscribedPackage: {},
      dataFetched: false,
      only_chat: true,
    };
  },

  computed: {
    subscribedPackageData() {
      return this.SubscribedPackage.package?.desc;
    },
    pageLoading() {
      return this.$store.getters.pageLoading;
    },
  },


  methods: {
    getPackages() {
     
      this.axios({
        method: "GET",
        url: "packages",
      })
        .then((res) => {
          this.packages = res.data.data;
          this.SubscribedPackage = res.data.SubscribedPackage;
          this.dataFetched = true;
       
         
        })
        .catch(() => {
          this.$toast.error("error");
        });
    },
    changePath() {
      this.only_chat = !this.only_chat;
    },
  },
  mounted() {
    this.getPackages();
  
  },
};
</script>

<style lang="scss">
.all_packages {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-block: 20px;
  row-gap: 25px;
}
</style>
