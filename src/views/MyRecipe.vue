<template>
    <div>
        <NavBar />
        <Header />
        <div v-if="recipes" >
        <Section :recipes="recipes" />
        </div>
        <div v-else class="mt-5 mb-3">
            <h1>작성한 레시피가 없습니다.</h1>
            <router-link to="/add-recipe" class="btn btn-secondary mt-3 mb-3">레시피 등록하러 가기</router-link>
        </div>
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
    components: {
        NavBar,
        Header,
        Section,
        Footer
    },    
    data() {
        return {
            recipes: []
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
                    this.getRecipe();
                }
            }
        );
    },
    methods: {
        async getRecipe() {
            await axios.get('/term/my-recipe',{ params: { writer: this.$store.state.Username } })
            .then((response)=>{
                if (response.data.length > 0) {
                    this.recipes = response.data;
                } else {
                    this.recipes = null;
                }
            });
        }
    }
}
</script>
<style scoped>
    
</style>