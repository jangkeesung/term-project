<template>
    <div>
        <NavBar />
        <Header />
        <Monthly v-bind:recipes="monthlyRecipes"/>
        <Section v-bind:recipes="recipes"/>
        <Footer v-if="recipes" />
        <Blank v-else />
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
import Blank from '../components/WhiteBody.vue';
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
        FadeLoader,
        Blank
    },    
    data() {
        return {
            isLoading: false, // 로딩 스피너
            recipes: null,
            monthlyRecipes: null,
            page: 0
        }
    },
    created() {
        this.getRecipe();
        this.getMonthlyRecipe();
    },
    mounted() {
        //사실 첫 페이지는 최대 8개만 가져와야 하는데 처음 렌더링할 때 스크롤이 짧아서 처음부터 스크롤 이벤트가 걸려서 한 줄 더 가져오게 되길래 준 딜레이
        setTimeout(() =>{
            window.addEventListener('scroll', this.scrollHandler);
        },100);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        async getRecipe() {
            await axios.get('/term/recipelist', {params: {page: this.page, rownum: this.$store.state.rownum}})
            .then((response)=>{
                let size = 0;
                if (this.recipes !== null) {
                    size = this.recipes.length;
                } else {
                    this.recipes = [];
                }
                // response.data;
                response.data.forEach((item, index)=>{
                    this.recipes.push({
                        r_seq: item.r_seq,
                        r_pic: item.r_pic,
                        r_subject: item.r_subject,
                        r_category: item.r_category,
                        r_regdate: item.r_regdate,
                        r_writer: item.r_writer
                    });
                });
                if (size < this.recipes.length) {
                    this.page++;
                } else {
                    //더 이상 다음 페이지가 없을 경우 이벤트 제거
                    window.removeEventListener('scroll', this.scrollHandler);
                }
            });
        },
        async getMonthlyRecipe() {
            await axios.get('/term/getMonthly')
            .then((response)=>{
                this.monthlyRecipes = response.data;
            });
        },
        scrollHandler() {
            let val = window.innerHeight + window.scrollY;
    
                if(val > document.body.offsetHeight - 1 && !this.isLoading){
                    this.isLoading = true;
                    setTimeout(()=>{
                        this.getRecipe().then(()=>{
                            this.isLoading = false;
                        });
                    }, 500);
                }
        }
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