<template lang="">
    <!-- Header-->
    <div v-if="$store.state.bannerImg">
        <a :href="bannerURL" target="_blank" class="bg-dark container px-4 px-lg-5 my-0 banner-container d-flex justify-content-center align-items-center" :style="bannerStyle">
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
    min-height: 300px;

}
</style>