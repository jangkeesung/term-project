<template>
    <div>
        <NavBar />
        <Header />
        <div v-if="recipes" >
            <Section :recipes="recipes" :my="my"/>
        </div>
        <div v-else class="mt-5 mb-5">
            <div class="">&nbsp;</div>
            <h1 class="mt-5">❌ 작성한 레시피가 없습니다.❌</h1>
            <router-link to="/add-recipe" class="btn btn-secondary mt-5 mb-5">레시피 등록하러 가기</router-link>
        </div>
        <Blank v-if="creating"/>
        <Footer v-else/>
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
import Footer from '../components/Footer.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import Blank from '../components/WhiteBody.vue';
import axios from 'axios';
export default {
    components: {
        NavBar,
        Header,
        Section,
        Footer,
        FadeLoader,
        Blank
    },
    data() {
        return {
            isLoading: false,
            recipes: [],
            page: 0,
            my: true,
            creating: true
        }
    },
    async created() {
        //비로그인 빠꾸
        await this.$store.dispatch('getMemberInfo').then(() => {
                if (this.$store.state.Username == null) {
                    alert('로그인이 필요합니다.')
                    // location.href = '#/login';
                    this.$router.push('/login');
                } else {
                    this.getMyRecipe().then(()=>{
                        //8개를 다 가져왔을 경우에 스크롤 이벤트 생성
                        if (this.recipes.length == this.$store.state.rownum) {
                            window.addEventListener('scroll', this.scrollHandler);
                        }
                    });
                }
            }
        );
    },
    mounted() {
        //첫 페이지는 최대 8개만 가져와야 하는데 처음 렌더링할 때 스크롤이 짧아서 처음부터 스크롤 이벤트가 걸려서 한 줄 더 가져오게 되길래 준 딜레이
        // setTimeout(() =>{
        //     window.addEventListener('scroll', this.scrollHandler);
        // },100);
        // if (this.recipes.length == 0) {
        //     window.removeEventListener('scroll', this.scrollHandler);
        // }
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        async getMyRecipe() {
            await axios.get('/term/my-recipe',{ params: { writer: this.$store.state.Username, page: this.page, rownum: this.$store.state.rownum } })
            .then((response)=>{
                // let size = 0;
                // if (this.recipes !== null) {
                //     size = this.recipes.length;
                // }
                if (response.data.length > 0) {
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
                    this.page++;
                } else {
                    // 처음 시작부터 가져올 게 없다면 null로 비워버리기
                    if (this.page == 0) {
                        this.recipes = null;
                    }
                    //내 레시피가 없을 경우 이벤트 제거 mounted에 타임아웃이 걸려 있어서 여기서도 타임아웃을 걸어야 이벤트리스너가 지워진다.
                    setTimeout(() =>{
                        window.removeEventListener('scroll', this.scrollHandler);
                    },100);
                }
                this.creating = false;
            });
        },
        scrollHandler() {
            let val = window.innerHeight + window.scrollY;

            if(val > document.body.offsetHeight - 1 && !this.isLoading){
                this.isLoading = true;
                setTimeout(()=>{
                    this.getMyRecipe().then(()=>{
                        this.isLoading = false;
                    });
                }, 500);
            }
        }
    }
}
</script>
<style scoped>
.loading {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}
</style>