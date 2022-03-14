<template>
  <swiper
    :slidesPerView="1.4"
    :centeredSlides="true"
    :spaceBetween="20"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="welcomeSwiper"
  >
    <swiper-slide class="flex flex-col text-sm leading-5 px-4">
      <img class="flex shrink" src="/src/assets/images/slide1girl.svg" alt="girl" />
      <p>Confused about ingredients’ names?</p>
      <p>Not sure what your hair needs?</p>
    </swiper-slide>
    <swiper-slide class="flex flex-col text-sm leading-5 px-4">
      <img src="/src/assets/images/slide2man.svg" alt="man" />
      <p>
        Scan the ingredients list and find out what really is inside the bottle!
      </p>
    </swiper-slide>
    <swiper-slide class="flex flex-col text-sm leading-5 px-4">
      <img src="/src/assets/images/slide3girl.svg" alt="girl" />
      <p>Enjoy beautiful and nourished hair!</p>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style>
.swiper {
  width: 100%;
  height: 90%;
}

.swiper-slide {
  height: 80%;
  text-align: center;
  font-size: 18px;
  background: #fff;
  border-radius: 12px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 44px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-pagination-bullet {
  width: 15px;
  height: 15px;
  border: 3px solid white;
  background: #ffffff;
  opacity: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
}

.swiper-pagination-bullet-active {
  background-color: #9764c7;
  width: 18px;
  height: 18px;
}
</style>
