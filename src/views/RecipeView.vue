<template>
    <div>
        <NavBar />
        <Section v-if='recipeDTO' v-bind:dto='recipeDTO' />
        <Footer v-if="recipeDTO" />
        <Blank v-else />
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Section from '../components/ViewSection.vue';
import Footer from '../components/Footer.vue';
import Blank from '../components/WhiteBody.vue';
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
        Blank
    },
    async created() {
      await axios.get("/term/view-recipe/" + this.$props.query)
      .then((response) =>{
          this.recipeDTO = response.data;
          if (response.data.r_seq == null) {
            this.$router.push('/');
          }
        //   console.log(this.recipeDTO);
      });
    }   
}
</script>
<style scoped>

</style>