<template lang="">
    <div class="btn-float mb-2" id="ub" @click="up()">
        UP
    </div>
    <div class="btn-float mb-2" @click="bk()">
        back
    </div>
</template>
<script>
export default {
    methods: {
        up() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
                });
        },
        bk() {
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
    html {
        scroll-behavior: smooth;
    }
</style>