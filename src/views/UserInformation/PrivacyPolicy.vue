<template>
  <div>
    <HeadCard />

  
   <div class="policy">
    <v-container>
      <div v-html="policy"></div>
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
      policy: null,
    };
  },
  methods: {
    getPolicy() {
      this.axios({
        method: "GET",
        url: "policy",
      })
        .then((res) => {
          this.policy = res.data.data.policy;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPolicy();
  },
};
</script>

<style lang="scss">

.policy{
  max-width: 1200px;
  font-family: Cairo-Regular;
  padding-block: 35px;
    font-size: 23px;
    line-height: 1.6;
    word-spacing: 1px;
    color:#313131;
    margin: auto;
}
</style>
