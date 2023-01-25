<template>
      <router-link
      class="package_card router"
      :to="{
        name: 'SelectedPackage',
        params: { id: mypackage.id },
      }"
    >
      <h5 class="package_title">{{ mypackage.name }}</h5>
      <h3 class="package_desc">
        {{ mypackage.number_of_products }} {{ $t("misc.monthly") }}
      </h3>
      <h5 class="package_price">
        <span class="price" style="margin: 0 7px">
          {{ mypackage.package_price }}
        </span>
        <span class="currency"> {{ $t("misc.AED") }} </span>
      </h5>
    </router-link>
</template>

<script>
export default {
props:['mypackage']
}
</script>

<style>

</style>