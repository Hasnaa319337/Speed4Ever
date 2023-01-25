<template>
  <div class="package_card" v-for="mypackage in packages" :key="mypackage.id">
    <PackageCard :mypackage="mypackage" />
  </div>
</template>

<script>
import PackageCard from "./OurPackages/PackageCard.vue";

export default {
  props: ["packages"],
  components: { PackageCard },
};
</script>

<style lang="scss">
.package_card {
  margin-block: 0;
  width: 35%;
  row-gap: 15px;
  background-color: #f7f5ef;
  border: none;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  color: #313131 !important;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  font-family: Cairo-SemiBold;

  padding: 17px 0;

  &:hover {
    background-color: #6c98a2;
    transform: scale(1.06);
    color: white !important;
    border: 2px solid #6c98a2;
  }

  .package_title {
    font-size: 20px;
  }

  .package_desc {
    font-size: 28px;
  }
  .package_remaining_time {
    font-size: 20px;
  }
  .package_price {
  }
}

.router {
  border: none;
  width: 95%;
  padding: 0;
  &:hover {
    border: none;
    transform: scale(1);
  }
}
.selected_package{
  background-color: #6c98a2;
  &:hover {
    background-color:  #f7f5ef;;
    transform: scale(1.06);
    color: #6c98a2 !important;
    border: 2px solid   white;
  }
}
.router{
  border: none !important;
}
</style>
