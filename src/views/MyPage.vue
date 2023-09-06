<template lang="">
        <NavBar />
        <Header />
        <Section />
        <Footer />
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Header from '../components/HomeHeader.vue';
import Section from '../components/MySection.vue';
import Footer from '../components/Footer.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
export default {
    beforeCreate() {
        this.$store.dispatch('getMemberInfo');
    },
    components: {
        NavBar,
        Header,
        Section,
        Footer,
        FadeLoader
    },      
}
</script>
<style lang="">
    
</style>