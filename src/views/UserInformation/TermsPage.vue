<template>
  <div>
    <HeadCard />

    <div class="policy">
      <v-container>
        <div v-html="terms"></div>
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
      terms: null,
    };
  },
  methods: {
    getPolicy() {
      this.axios({
        method: "GET",
        url: "terms",
      })
        .then((res) => {
          this.terms = res.data.data.terms;
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
.policy {
  max-width: 1200px;
  font-family: Cairo-Regular;
  padding-block: 35px;
  font-size: 23px;
  line-height: 1.6;
  word-spacing: 1px;
  color: #313131;
  margin: auto;
}
</style>
