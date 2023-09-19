<template>
    <div>
        <NavBar :p_category="s_category"/>
        <!-- <Section :recipes="recipes" :p_col="s_col" :p_word="s_word"/> -->
        <Section :recipes="recipes" :isLoading="isLoading" :p_col="col" :p_word="word" :p_category="s_category" @gosearch="handleSearch"/>
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
import Section from '../components/SearchSection.vue';
import Monthly from '../components/Monthly.vue';
import Footer from '../components/Footer.vue';
import Blank from '../components/WhiteBody.vue';
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
        Blank,
        FadeLoader
    },
    props: ['s_category'],
    data() {
        return {
            isLoading: false, // 로딩 스피너
            isSearch: false, // 검색 버튼 클릭
            recipes: null,
            page: 0,
            col: "",
            word: ""
        }
    },
    async created() {
        this.col = this.$store.state.s_col;
        this.word = this.$store.state.s_word;
        this.$store.commit('setColWord', {s_col:"r_subject", s_word: ""});
        // if (this.s_category) {
        // } else {
        //     this.col = "r_subject";
        //     this.word = "";
        // }
        await this.getRecipe(this.col, this.word);
    },
    mounted() {
        // console.log('mounted');
        //사실 첫 페이지는 최대 8개만 가져와야 하는데 처음 렌더링할 때 스크롤이 짧아서 처음부터 스크롤 이벤트가 걸려서 한 줄 더 가져오게 되길래 준 딜레이
        setTimeout(() =>{
            window.addEventListener('scroll', this.scrollHandler);
        },100);
        window.scrollTo(0, 0);
    },
    beforeUnmount() {
        // console.log('beforeUnmount');
        //페이지 이동 시 스크롤 이벤트 해제
        window.removeEventListener('scroll', this.scrollHandler);
        //페이지 이동 시 검색 기록 초기화
        this.$store.commit('setColWord', {s_col:"r_subject", s_word: ""});
    },
    watch: {
        async s_category() {
            this.recipes = null;
            this.page = 0;
            this.word = '';
            this.col = 'r_subject';
            window.scrollTo(0, 0);
            window.addEventListener('scroll', this.scrollHandler);
            await this.getRecipe(this.col, this.word);
        }
    },
    methods: {
        //레시피를 가져오는 메소드 rownum의 개수만큼 rownum * page부터
        async getRecipe(col, word) {
            await axios.get('/term/search-recipe', {params: {page: this.page, rownum: this.$store.state.rownum, s_col: col, s_word: word.trim(), s_category: this.s_category}})
            .then((response)=>{

                // let size = 0;
                // if (this.recipes !== null && !this.isSearch) {
                //     size = this.recipes.length;
                // } else {
                //     this.recipes = [];
                // }

                //가져오기 전 레시피가 null이면 array로 선언
                if (this.recipes == null) {
                    this.recipes = [];
                }
                
                //만약 가져온 레시피의 개수가 0보다 클 경우
                if (response.data.length > 0) {
                    //가져온 리스트를 레시피에 push
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
                    // window.addEventListener('scroll', this.scrollHandler);
                    this.isSearch = false;
                    this.page++;
                } else {
                    //0개 여서 더 이상 다음 페이지가 없을 경우 이벤트 제거
                    window.removeEventListener('scroll', this.scrollHandler);
                }
            })
            .catch(e=>console.error(e));
        },
        handleSearch(ns_col, ns_word) {
            this.recipes = null;
            this.page = 0;
            this.isSearch = true;
            this.isLoading = true;
            window.addEventListener('scroll', this.scrollHandler);
            setTimeout(()=>{
                this.getRecipe(ns_col, ns_word).then(()=>{
                    window.scrollTo(0, 0);
                    this.col = ns_col;
                    this.word = ns_word;
                    this.isLoading = false;
                    // this.$store.commit('setColWord', {s_col: this.col, s_word: this.word});
                    // console.log('스크롤이벤트 발생');
                    });
                }, 500)
        },
        scrollHandler() {
            // console.log(this.page);
            let val = window.innerHeight + window.scrollY;

            if(val > document.body.offsetHeight - 1 && !this.isLoading){
                this.isLoading = true;
                setTimeout(()=>{
                    this.getRecipe(this.col, this.word).then(()=>{
                        this.isLoading = false;
                        // console.log('스크롤이벤트 발생');
                    });
                }, 500);
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