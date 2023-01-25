<template>
  <div class="loading">
    <div class="logo mb-4">
      <img
        src="https://www.speed4ever.com/img/loader.b7e0d86a.gif"
        class="img_loader"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.img_loader {
  width: 550px;
  height: auto;
  margin-bottom: 50px;
}
</style>
