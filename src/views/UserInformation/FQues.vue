<template>
    <div>
      <HeadCard/>

      <div class="policy">
    <v-container>
      <div v-html="faqs"></div>
    </v-container>
   </div>
    </div>
  </template>
  
  <script>
import HeadCard from "@/components/HeadCard.vue";

export default {
  components: { HeadCard },
  data() {
    return {
      faqs: null,
    };
  },
  methods: {
    getFques() {
      this.axios({
        method: "GET",
        url: "faqs",
      })
        .then((res) => {
          this.faqs = res.data.data.faqs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getFques();
  },
};
</script>
  
  <style>
  
  </style>