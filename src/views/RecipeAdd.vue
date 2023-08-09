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
    }
}
</script>
<style scoped>
    
</style>