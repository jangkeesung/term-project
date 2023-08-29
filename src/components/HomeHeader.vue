<template lang="">
    <!-- Header-->
    <div v-if="$store.state.bannerImg" class="py-5 banner-container bg-dark" :style="bannerStyle">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">{{ bannerText }}</h1>
                <p v-if="$store.state.bannerText" class="lead fw-normal text-white-50 mb-0"></p>
            </div>
            <!-- <img v-if="$store.state.bannerImg" :src="require(`@/assets/img/banner/${bannerImg}`)"> -->
        </div>
    </div>
</template>
<script>


export default {
    created() {
        if (this.$store.state.bannerImg == '') {
            this.$store.dispatch('getBanner');
        }

    },
    computed: {
        bannerText() {
            return this.$store.state.bannerText;
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
    background-size: cover;
    background-position: center;
}
</style>