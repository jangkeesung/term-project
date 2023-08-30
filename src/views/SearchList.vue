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
    async created() {
        this.col = this.$store.state.s_col;
        this.word = this.$store.state.s_word;
        await this.getRecipe();
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
        //사실 첫 페이지는 최대 8개만 가져와야 하는데 처음 렌더링할 때 스크롤이 짧아서 처음부터 스크롤 이벤트가 걸려서 한 줄 더 가져오게 된다. 그래도 문제는 없어서 일단 보류
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        async getRecipe() {
            await axios.get('/term/search-recipe', {params: {page: this.page, s_col: this.col, s_word: this.word}})
            .then((response)=>{
                let size = 0;
                if (this.recipes !== null) {
                    size = this.recipes.length;
                }
                this.recipes = response.data;
                if (size < this.recipes.length) {
                    this.page++;
                }
            });
        },
        async handleSearch(ns_col, ns_word) {
            this.page = 1;
            this.col = ns_col;
            this.word = ns_word;
            await this.getRecipe();
        },
        scrollHandler() {
            let val = window.innerHeight + window.scrollY;

            if(val > document.body.offsetHeight - 1 && !this.isLoading){
                this.isLoading = true;
                setTimeout(()=>{
                    this.getRecipe().then(()=>{
                        this.isLoading = false;
                        console.log('스크롤이벤트 발생');
                    });
                }, 500)
            }
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