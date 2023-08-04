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
import axios from 'axios';
export default {
    components: {
        NavBar,
        Section,
        Footer
    },
    data() {
        return {

        }
    },
    created() {
        // axios.get()
        // .then()
        // .catch()
    }
}
</script>
<style scoped>
    
</style>