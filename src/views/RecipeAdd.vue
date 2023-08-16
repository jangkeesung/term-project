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
        //비로그인 빠꾸
        this.$store.dispatch('getMemberInfo').then(() => {
                if (this.$store.state.Username == null) {
                    alert('로그인이 필요합니다.')
                    // location.href = '#/login';
                    this.$router.push('/login');
                }
            }
        );
    }
}
</script>
<style scoped>
    
</style>