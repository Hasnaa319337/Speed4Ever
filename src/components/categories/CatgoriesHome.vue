<template>
  <section class="categories">
    <v-container class="my_container">
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="3"
          xs="6"
          class="cat"
          v-for="category in categories"
          :key="category.id"
        >
          <CategoryCard :items="category" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import CategoryCard from "../categories/CategoryCard";

  export default({
    props:['categories'],
    components:{
      CategoryCard
    }
  })







</script>

<style lang="scss">
.categories {
  margin-bottom: 40px;

}
</style>
