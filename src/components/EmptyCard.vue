<template>
      <div
      class="empty_message_wrapper"
      style="height: 40vh"
   
    >
      <div class="image_wrapper">
        <img
          src="https://www.speed4ever.com/img/products.6b7baf69.svg"
          alt="Empty Message"
          width="300"
          height="160"
        />
      </div>
      <div class="text_wrapper">
        <h3 class="message_title">{{ text }}</h3>
      </div>
    </div>
    <!-- End:: Empty Message -->
</template>

<script>
export default {
props:['text'],
}
</script>

<style lang="scss">

/* Start:: Empty Section */

.empty_message_wrapper {
  height: 60vh;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  row-gap: 15px;

  .text_wrapper .message_title {
    color: #6c98a2;
    font-family: Cairo-SemiBold;
  }
}
.product_name {
  margin-block: 0;
  text-align: start;
  font-size: 18px;
  font-family: Cairo-Bold;

  a {
    color: #313131 !important;
  }
}
/* End:: Empty Section */

</style>