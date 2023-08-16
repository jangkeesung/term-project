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
import Section from '../components/RegisterSection.vue';
import Footer from '../components/Footer.vue';
export default {
    beforeCreate() {
        //로그인 회원은 빠꾸
        this.$store.dispatch('getMemberInfo').then(() => {
                if (this.$store.state.Username != null) {
                    this.$router.push('/');
                }
            }
        );
    },
    components: {
        NavBar,
        Header,
        Section,
        Footer
    }
  
}
</script>
<style scoped>
    
</style>