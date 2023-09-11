<template>
    <div>
        <NavBar />
        <Header />
        <Section v-if='recipeDTO' v-bind:dto='recipeDTO' />
        <Footer v-if="recipeDTO" />
        <Blank v-else />
        <div class="box-float">
            <UB />
        </div>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Header from '../components/HomeHeader.vue';
import Section from '../components/EditSection.vue';
import Footer from '../components/Footer.vue';
import Blank from '../components/WhiteBody.vue';
import UB from '../components/UpButton.vue'
import axios from 'axios';
export default {
    components: {
        NavBar,
        Header,
        Section,
        Footer,
        Blank,
        UB
    },
    beforeCreate() {
        this.$store.dispatch('getMemberInfo');
    },
    data() {
        return {
            recipeDTO: null
        };
    },
    props: ['query'],

    async created() {
      await axios.get("/term/view-recipe/" + this.$props.query)
      .then((response) =>{
          this.recipeDTO = response.data;
        //   console.log(this.recipeDTO);
      });
    }  
}
</script>
<style scoped>
</style>