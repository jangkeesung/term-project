<template>
    <div>
        <Section v-if='recipeDTO' v-bind:dto='recipeDTO' />
    </div>
</template>
<script>
import Section from '../components/ViewSection.vue';
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
        Section,
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
<style>
    .btn-float {
        display: none !important;
    }

    #ub {
        display: block !important;
    }
</style>