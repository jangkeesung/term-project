<template>
    <div>
        <NavBar />
        <Section v-if='recipeDTO' v-bind:dto='recipeDTO' />
        <Footer />


    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Section from '../components/ViewSection.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
export default {
    data() {
        return {
            recipeDTO: null
        };
    },
    beforeCreate() {
        this.$store.dispatch('getMemberInfo');
    },
    props: ['query'],
    components: {
        NavBar,
        Section,
        Footer,
    },
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
    .box-float {
        bottom: 8%;
	    right: 3%;
        position: fixed;
    }
</style>