<template>
  <div>
    <!-- :to="{ name: 'CategorieDetails', params: { id: data.id } }" -->

    <router-link
      :to="{
        name: 'CategoryDetails',
        params: { id: items.id },
      }"
    >
      <div class="cat">
        <img :src="items.image" @click="findid" />

        <p class="catname">{{ items.name }}</p>

        <!-- {{ category.items }} -->
      </div>
    </router-link>

    <!-- <CategorieDetails :data="data"/> -->
  </div>
</template>

//
<script setup>
import { defineProps } from "vue";
defineProps({
  items: {
    type: String,
    required: true,
  },
});
// export default {
//   props: ["items"],
// };
// import { defineProps, toRefs } from "vue";

// const props = defineProps(["items"]);

// const category = toRefs(props);
</script>

<style lang="scss" scoped>
a {
  padding: 10px;
  background-color: #f7f5ef70;
  // border: 2px solid f7f5ef;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
}
.cat_col {
  margin-top: 12px !important;
  margin-bottom: 12px !important;
}
.cat {
  color: #313131;
  &:hover img {
    transform: scale(1.06);
  }

  img {
    width: 70px;
    // object-fit: cover;
    vertical-align: middle;
    object-position: top;
    transition: all 0.5s linear;
    margin: auto;
    display: block;

    &:hover {
      transform: scale(1.06);
    }
  }
  .catname {
    margin: 0;
    font-size: 17px;
    width: 100%;
    padding: 16px 0px;
    text-align: center;
    font-family: Cairo-Bold;
  }
}
</style>
