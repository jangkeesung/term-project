<template>
    <div>
        <NavBar />
        <Header />
        <div v-if="recipes" >
            <Section :recipes="recipes" :my="my"/>
        </div>
        <div v-else class="mt-5 mb-3">
            <h1>작성한 레시피가 없습니다.</h1>
            <router-link to="/add-recipe" class="btn btn-secondary mt-3 mb-3">레시피 등록하러 가기</router-link>
        </div>
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
import Footer from '../components/Footer.vue';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import axios from 'axios';
export default {
    components: {
        NavBar,
        Header,
        Section,
        Footer,
        FadeLoader
    },    
    data() {
        return {
            isLoading: false,
            recipes: null,
            page: 1,
            my: true
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
                    this.getMyRecipe();
                }
            }
        );
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        async getMyRecipe() {
            await axios.get('/term/my-recipe',{ params: { writer: this.$store.state.Username, page: this.page } })
            .then((response)=>{
                let size = 0;
                if (this.recipes !== null) {
                    size = this.recipes.length;
                }
                if (response.data.length > 0) {
                    this.recipes = response.data;
                    if (size < this.recipes.length) {
                        this.page++;
                    }
                } else {
                    this.recipes = null;
                }
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