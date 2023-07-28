<template>
    <div>
        <NavBar />
        <Section />
        <Footer />
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Section from '../components/ViewSection.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        NavBar,
        Section,
        Footer
    }
}
</script>
<style scoped>
    
</style>