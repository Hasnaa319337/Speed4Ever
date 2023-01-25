<template>
  <div>
    <router-link to="">
      <span>{{ router_link }}</span>
      <v-icon icon="mdi-arrow-left-thin" />
    </router-link>
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["router_link", "link_to"],
};
</script>

<style lang="scss" scoped>

</style>
