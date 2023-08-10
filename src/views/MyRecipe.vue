<template>
    <div>
        <NavBar />
        <Header />
        <Section v-bind:recipes="recipes" />
        <Footer />
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Header from '../components/HomeHeader.vue';
import Section from '../components/HomeSection.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
export default {
    beforeCreate() {
        this.$store.dispatch('getMemberInfo');
    },
    components: {
        NavBar,
        Header,
        Section,
        Footer
    },    
    data() {
        return {
            recipes: null
        }
    },
    created() {
        if (this.$store.state.User == null) {
            alert('로그인 회원 기능입니다.');
            location.href = '#/';
        } else {
            axios.get('/term/my-recipe',{ params: { writer: this.$store.state.User.id } }).then((response)=>{
              this.recipes = response.data;
          });
        }
    }
}
</script>
<style scoped>
    
</style>