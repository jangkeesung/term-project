<template>
    <div>
        <NavBar />
        <Header />
        <Monthly v-bind:recipes="monthlyRecipes"/>
        <Section v-bind:recipes="recipes"/>
        <Footer />
        <div v-if="isLoading" class="loading-container">
            <div class="loading">
                <Fade-loader />
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Header from '../components/HomeHeader.vue';
import Section from '../components/HomeSection.vue';
import Monthly from '../components/Monthly.vue';
import Footer from '../components/Footer.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import axios from 'axios';
export default {
    beforeCreate() {
        this.$store.dispatch('getMemberInfo');
    },
    components: {
        NavBar,
        Header,
        Monthly,
        Section,
        Footer,
        FadeLoader
    },    
    data() {
        return {
            isLoading: false, // 로딩 스피너
            recipes: null,
            monthlyRecipes: null,
            page: 1
        }
    },
    created() {
        this.getRecipe();
        this.getMonthlyRecipe();
        window.addEventListener('scroll', () => {
            let val = window.innerHeight + window.scrollY;

            if(val > document.body.offsetHeight - 1 && !this.isLoading){
                this.isLoading = true;
                setTimeout(()=>{
                    this.getRecipe().then(()=>{
                        this.isLoading = false;
                    });
                }, 500);
            }
        });
    },
    methods: {
        async getRecipe() {
            await axios.get('/term/recipelist', {params: {page: this.page}})
            .then((response)=>{
                this.recipes = response.data;
                this.page++;
            });
        },
        async getMonthlyRecipe() {
            await axios.get('/term/getMonthly')
            .then((response)=>{
                this.monthlyRecipes = response.data;
            });
        },
    }
}
</script>
<style scoped>
body {
    background-image: url('@/assets/img/pattern-bg.png');
}
.loading {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}
</style>