<template lang="">
    <div class="ub" @click="up()">
        UP
    </div>
    <div class="bk" @click="bk()">
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
    .ub {
        bottom: 17%;
	    right: 3%;
        position: fixed;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 55px;
        border-radius: 50%;
        background-color: #808080;
        opacity: 0.5; 
        cursor: pointer;
        color: black;
        }
    .bk {
        bottom: 9%;
	    right: 3%;
        position: fixed;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 50%;
        background-color: #808080;
        opacity: 0.5; 
        cursor: pointer;
        color: black;
    }
</style>