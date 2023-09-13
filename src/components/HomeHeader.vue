<template lang="">

    <!-- Header-->
    <div v-if="$store.state.bannerImg">
        <a :href="bannerURL" target="_blank" class="bg-grad container px-4 px-lg-5 my-0 banner-container d-flex justify-content-center align-items-center" :style="bannerStyle">
            <div class="text-center text-white">
                <!-- <h1 class="display-4 fw-bolder">{{ bannerText }}</h1> -->
                <!-- <p v-if="$store.state.bannerText" class="lead fw-normal text-white-50 mb-0"></p> -->
            </div>
            <!-- <img v-if="$store.state.bannerImg" :src="require(`@/assets/img/banner/${bannerImg}`)"> -->
        </a>
    </div>
</template>
<script>


export default {
    created() {
        // if (this.$store.state.bannerImg == '') {
            this.$store.dispatch('getBanner');
        // }
    },
    methods: {
        goBanner() {
            location.href = this.bannerText;
        }
    },
    computed: {
        bannerURL() {
            return this.$store.state.bannerURL;
        },
        bannerImg() {
            return this.$store.state.bannerImg;
        },
        // bannerStyle() {
        //     if (this.bannerImg) {
        //         let url = "";
        //         try {
        //             url = require(`@/assets/img/banner/${this.bannerImg}`);
        //         } catch (error) {
        //             console.log(error);
        //             //사진이 바뀌어서 에러가 날 경우 다시 데이터를 가져오는 처리
        //             if (error.message.startsWith('Cannot find module')) {
        //                 this.$store.dispatch('getBanner').then(()=>{
        //                     url = require(`@/assets/img/banner/${this.bannerImg}`);
        //                 });
        //             }
        //         }
        //         return {
        //             backgroundImage: `url(${url})`
        //         };
        //     }
        //     return {};
        // }
        bannerStyle() {
            if (this.bannerImg) {
                let url = "";
                try {
                // 이미지 파일을 require.context를 사용하여 동적으로 로드
                const images = require.context('@/assets/img/banner', false, /\.(jpg|jpeg|png|gif|svg)$/);
                url = images(`./${this.bannerImg}`);
                } catch (error) {
                console.log(error);
                // 이미지가 없는 경우 데이터를 다시 가져오는 처리
                if (error.message.startsWith('Cannot find module')) {
                    this.$store.dispatch('getBanner').then(() => {
                    // 데이터를 다시 가져온 후 이미지 파일을 다시 로드
                    const images = require.context('@/assets/img/banner', false, /\.(jpg|jpeg|png|gif|svg)$/);
                    url = images(`./${this.bannerImg}`);
                    });
                }
                }
                return {
                backgroundImage: `url(${url})`
                };
            }
            return {};
        }
    }
}
</script>
<style scoped>
.banner-container {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
    position: relative;
}
/* .bg-grad::before {
    content: '';
    display: block;
    background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
} */

@media (min-width: 576px) {
    .banner-container {
    height: 123px;
  }
}
@media (min-width: 768px) {
    .banner-container {
    height: 165px;
  }
}
@media (min-width: 992px) {
    .banner-container {
    height: 219px;
  }
}
@media (min-width: 1200px) {
    .banner-container {
    height: 260px;
  }
}
@media (min-width: 1400px) {
  .banner-container {
    height: 300px;
  }
}
</style>