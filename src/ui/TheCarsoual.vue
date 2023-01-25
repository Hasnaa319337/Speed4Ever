<template>
  <div>
    <div class="container_div">
      <div class="socials">
        <v-list>
          <v-list-item>
            <router-link to="/">
              <v-icon icon="mdi-facebook"></v-icon
            ></router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/">
              <v-icon icon="mdi-twitter"></v-icon
            ></router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/">
              <v-icon icon="mdi-instagram"></v-icon
            ></router-link>
          </v-list-item>
        </v-list>
      </div>

      <div
        id="carouselExampleDark"
        class="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <div>
            <div class="div_dots" v-for="(slide, index) in slider" :key="index">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                :data-bs-slide-to="index"
                class="active active_btn"
              >
              <!-- index of slides -->
                <span> 0{{ index + 1 }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="carousel-inner">
          <div
            class="carousel-item active"
            data-bs-interval="3000"
            v-for="slide in slider"
            :key="slide.id"
          >
            <a :href="slide.link"
              ><img :src="slide.image" class="d-block w-100" />
            </a>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["slider"],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.container_div {
  position: relative;
  overflow: hidden;
  background: #fbf9f4;
  .social_list {
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    flex-direction: column;

    .social_link {
      float: none !important;
      width: 20px;

      margin: 0 !important;
    }
  }
  .socials {
    position: absolute;
    left: 0;
    z-index: 3;
    height: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 10%;

    .v-list {
      background: transparent;
      .v-icon {
        // background: #6c98a2;
        color: #6c98a2;
        font-size: 40px;
        margin-bottom: 20px;
        cursor: pointer;
        // border-radius: 50%;
        // width: 30px;
        // height: 30px;
        // padding: 15px;

        &:hover {
          color: rgb(0, 0, 0);
        }
      }
      .v-list-item {
        float: none;
      }
    }
  }

  .carousel {
    width: 90%;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .carousel-inner {
      background: none !important;
      flex-direction: column;
      top: 50%;
      align-items: start !important;
      margin-right: 10px;
      button {
        margin-bottom: 10px;
      }
    }
  }
}

.container_div .carousel .carousel-inner button {
  color: #c9d5d4;
}
.carousel-indicators {
  position: relative;
  right: 0 !important;
  bottom: auto !important;
  top: 50% !important;

  margin: 0 30px !important;
  display: flex;
  // align-items: center;
  justify-content: start !important;
  column-gap: 10px;
}
.div_dots {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px !important;
  height: 23px !important;
  border-radius: 50% !important;
  border: 1px solid rgb(108 152 162) !important;
  margin: 5px !important;
  transition: 0.3s all ease-in-out;
  background: none !important;
  margin-bottom: 20px !important;
}

button {
  text-indent: 0 !important;
  flex: none !important;
}
.active_btn {
  background-color: rgb(108 152 162) !important;
  width: 13px !important;
  height: 13px !important;
  border-radius: 50% !important;
  margin: 5px !important;
}
.div_dots:has(.active_btn.active) {
  zoom: 1.2;
  // transform: scaleZ(1.2);
}

.active_btn span {
  color: rgb(108 152 162);
  font-size: 20px;
  position: absolute;
  left: 3%;
}
.div_dots:first-of-type button span {
  top: 1%;
}
.div_dots:last-of-type button span {
  bottom: 19%;
}
.carousel-inner {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}
@media (max-width: 1000px) {
  .container_div {
    .socials {
      // width: 15%;

      .v-icon {
        // background: #6c98a2;
        color: #6c98a2;
        font-size: 30px !important;
        margin-bottom: 20px;
        // border-radius: 50%;
        // width: 30px;
        // height: 30px;
        // padding: 15px;
      }
    }
  }
}

@media (max-width: 700px) {
  .container_div {
    .socials {
      width: 15%;

      .v-icon {
        // background: #6c98a2;
        color: #6c98a2;
        font-size: 25px !important;
        margin-bottom: 20px;
        // border-radius: 50%;
        // width: 30px;
        // height: 30px;
        // padding: 15px;
      }
    }
    .carousel {
      width: 85%;
    }
  }
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  display: none !important;
}

@media (max-width: 1490px) {
  .active_btn span {
    left: 4%;
  }
}
@media (max-width: 1100px) {
  .active_btn span {
    left: 7%;
  }
}
@media (max-width: 750px) {
  .active_btn span {
    left: 8%;
  }
}
@media (max-width: 750px) {
  .active_btn span {
    left: 10%;
    font-size: 15px;
  }
  .div_dots:first-of-type button span {
    top: 5%;
  }
  .div_dots:last-of-type button span {
    bottom: 21%;
  }
  .div_dots {
    width: 20px !important;
    height: 20px !important;
  }
  .active_btn {
    width: 10px !important;
    height: 10px !important;
  }
}
@media (max-width: 800px) {
  .carousel-indicators {
    top: 30% !important;
  }
}
</style>
