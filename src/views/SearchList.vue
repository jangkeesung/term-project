<template>
    <div>
        <NavBar />
        <Section :recipes="recipes" :p_col="col" :p_word="word" @gosearch="handleSearch"/>
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
import Section from '../components/SearchSection.vue';
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
    //props: ['s_col', 's_word'],
    data() {
        return {
            isLoading: false, // 로딩 스피너
            recipes: null,
            monthlyRecipes: null,
            page: 1,
            col: "",
            word: ""
        }
    },
    created() {
        this.col = this.$store.state.s_col;
        this.word = this.$store.state.s_word;
        this.getRecipe();
        window.addEventListener('scroll', () => {
            let val = window.innerHeight + window.scrollY;

            if(val > document.body.offsetHeight - 1 && !this.isLoading){
                this.isLoading = true;
                setTimeout(()=>{
                    this.getRecipe().then(()=>{
                        this.isLoading = false;
                    });
                }, 500)
            }
        });
    },
    methods: {
        async getRecipe() {
            await axios.get('/term/search-recipe', {params: {page: this.page, s_col: this.col, s_word: this.word}})
            .then((response)=>{
                this.recipes = response.data;
                this.page++;
            });
        },
        async handleSearch(ns_col, ns_word) {
            this.page = 1;
            this.col = ns_col;
            this.word = ns_word;
            await this.getRecipe();
        }
    },
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