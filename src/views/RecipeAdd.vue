<template>
    <div>
        <NavBar />
        <Header />
        <Section />
        <Footer />
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Header from '../components/HomeHeader.vue';
import Section from '../components/AddSection.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        NavBar,
        Header,
        Section,
        Footer
    },
    beforeCreate() {
        this.$store.dispatch('getMemberInfo');
        if (this.$store.state.User == null) {
            alert('로그인 회원 기능입니다.');
            location.href = '#/';
        }
    }
}
</script>
<style scoped>
    
</style>