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
        bannerStyle() {
            if (this.bannerImg) {
                let url = require(`@/assets/img/banner/${this.bannerImg}`);
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
    min-height: 300px;
    position: relative;

}
.bg-grad::before {
    content: '';
    display: block;
    background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    /* opacity: 0.5; */
}
</style>