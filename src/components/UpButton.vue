<template lang="">
    <div class="btn-float mb-2" @click="up()">
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
            window.scrollTo(0,0);
        },
        bk() {
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>

</style>