<template lang="">
    <div class="ub" @click="up()">
        UP
    </div>
</template>
<script>
export default {
    methods: {
        up() {
            console.log("up")
            window.scrollTo(0,0);
        }
    }
}
</script>
<style scoped>
    .ub {
        bottom: 50px;
	    right: 50px;
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
</style>