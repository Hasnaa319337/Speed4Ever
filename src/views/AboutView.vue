<template>
  <div class="about">
    <head-card />

    <div class="about">
   
      <v-container>
        <h2> {{ $t('misc.About company') }}</h2>
     
        <div v-html="info" class="info"></div>
      </v-container>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import HeadCard from "@/components/HeadCard";
const info = ref(null);


function getAboutData() {
  axios({
    method: "GET",
    url: "about",
  })
    .then((res) => {
      info.value = res.data.data.about;
    
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  getAboutData();
});
// import HeadCard from "@/components/HeadCard";

// export default {
//   components: {
//     HeadCard,
//   },
//   data() {
//     return {
//       info: null,
//     };
//   },

//   methods: {
//     getAboutData() {
//       this.axios({
//         url: "about",
//         method: "GET",
//       })
//         .then((res) => {
//           this.info = res.data.data.about;
//           console.log(this.info);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   },
//   created() {
//     this.getAboutData();
//   },
// };
</script>

<style lang="scss">
.about {
  text-align: center;
  // padding: 20px 0;
  font-size: 20px;
  font-family: Cairo-Regular;
  h2 {
    font-family: Cairo-ExtraBold;
    font-size: 24px;
    margin-top: 10px;
  }
  .info {
    color: #313131;
  
  }
}
</style>
