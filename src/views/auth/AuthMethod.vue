<template>
  <div

  >
    <div class="form_logo">
      <router-link to="/">
        <img src="@/assets/images/logo.bb997692.svg" />
      </router-link>
    </div>
    <div class="select_auth">
      <h1>{{ $t("misc.Welcome") }}</h1>
      <h3>
        {{ $t("misc.Register now and enjoy unique features and experience") }}
      </h3>
      <div class="button_div">
        <router-link to="/auth/:auth/register" style="width: 200px;padding-top: 9px;">
          {{ $t("buttons.signUp") }}</router-link
        >
      </div>
      <router-link to="/auth/:auth/login" class="login_route_wrapper">
        <span>{{ $t("misc.Already") }}</span
        ><span> {{ $t("buttons.signIn") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.auth {
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 15px;
  background-color: #fbf9f4;
  overflow: hidden;
  font-family: Cairo-SemiBold;
  &::before,
  &::after {
    width: 450px;
    height: 450px;
    background: url("https://www.speed4ever.com/img/circle.edec61b4.svg");
    content: "";
    position: absolute;
    display: block;
    z-index: 1;
  }
  &::before {
    bottom: -150px;
    left: -150px;
    background-size: 100%;
  }
  &::after {
    top: -200px;
    right: -200px;
    background-size: 103%;
  }
  h1 {
    text-align: center;
    font-size: 28px;
    font-family: Cairo-Bold;

    margin-top: 20px;
  }

  h3 {
    color: #8d8d8d;
    margin-block: 25px;
    font-size: 20px;
    text-align: center;
  }
  .form_content {
    padding: 20px 45px;
    background-color: #fff;
    border-radius: 20px;
    width: 40%;
    max-height: 95vh;
    overflow-y: auto;

    .form_logo {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      a {
      }
    }
    .select_auth {
      text-align: center;
      color: #313131;

      .button_div {
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          position: relative;
          display: inline-block;
          width: 144px !important;
          height: 50px;
          text-align: center;
          margin-top: 30px;
          padding: 7px 20px;
          font-size: 20px;
          font-family: Cairo-SemiBold;
          color: #f3f3f3;
          background-image: linear-gradient(90deg, transparent 50%, #6c98a2 0);
          background-position: 100%;
          background-size: 400%;
          border: 1px solid #6c98a2;
          border-radius: 35px;
          transition: all 0.6s ease-in-out;
          margin-top: 25px;

          &:hover {
            color: #6c98a2;
            background-position: 0;
          }
        }
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;

        column-gap: 6px;
        width: 100%;
        margin: 20px 0px;
        span:first-of-type {
          color: #8d8d8d;
        }
        span:last-of-type {
          font-family: Cairo-SemiBold;
          font-size: 18px;
          color: #313131;
        }
      }
    }
  }
}
</style>
