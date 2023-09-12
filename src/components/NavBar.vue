<template lang="">
        <!-- Navigation-->
        <Register v-if="registerModal" @modalClose="rmodalClose"/>
        <Login v-if="loginModal" @modalClose="lmodalClose"/>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <router-link to="/" class="navbar-brand">OurRecipes</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item" v-if="$store.state.Username != null">
                            <router-link to="/add-recipe" class="nav-link active a-addrecipe" aria-current="page">레시피 등록</router-link>
                        </li>
                        <li class="nav-item" v-if="$store.state.Username != null">
                            <router-link to="/my-recipe" class="nav-link active a-myrecipe" aria-current="page">내 레시피</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{category}}</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link :to="'/search?category=0'" class="dropdown-item" aria-current="page">전체</router-link>
                                </li>
                                <li v-for="(item, index) in categorylist" :key="item"  :value="item.seq">
                                    <router-link :to="'/search?category='+item.seq" class="dropdown-item" aria-current="page">{{item.name}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <button v-if="$store.state.Username == null" class="btn btn-outline-dark me-3" @click="loginModal = true">
                            로그인                            
                        </button>
                        <button v-if="$store.state.Username == null" class="btn btn-outline-dark me-3" @click="registerModal = true">
                            회원가입                            
                        </button>
                        <!-- <button v-if="$store.state.Username != null" class="btn btn-outline-dark me-3" @click="this.$router.push('/mypage');">
                            <i class="bi bi-person-fill me-1"></i>
                            마이페이지                          
                        </button> -->
                        <button v-if="$store.state.Username != null" class="d-flex align-items-center me-3 fw-bolder mypage btn btn-outline-dark" @click="goMypage"><span>👩‍🍳 {{$store.state.Username}}</span></button>
                        <button v-if="$store.state.Username != null" class="btn btn-outline-dark me-3" @click="logout();">
                            로그아웃                          
                        </button>
                    </div>
                </div>
            </div>
        </nav>
</template>
<script>
import Register from '../components/RegisterModal.vue';
import Login from '../components/LoginModal.vue';
import axios from 'axios';
export default {
    // beforeCreate() {
    //     this.$store.dispatch('getMemberInfo');
    // },
    props: ['p_category'],
    data() {
        return {
            registerModal: false,
            loginModal: false,
            categorylist: [],
            // category: '카테고리'
        };
    },
    computed: {
        category() {
            if (this.p_category == 0) {
                return '전체';
            }
            if (this.p_category == undefined || this.p_category == null || this.p_category == '') {
                return '카테고리';
            }
            const foundCategory = this.categorylist.find(item => this.p_category == item.seq);
            if (foundCategory && foundCategory.name) {
                return foundCategory.name;
            }
        }
    },
    created() {
        axios.get("/term/get-category")
        .then((response)=>{
            response.data.forEach((item, index)=>{
                this.categorylist.push({seq: item.ct_seq, name: item.ct_name});
            });
        });
    },
    components: {
        Register,
        Login
    },
    methods: {
        logout() {
            Swal.fire({
                   title: '로그아웃 하시겠습니까?',
                   text: " ",
                   icon: 'warning',
                   showCancelButton: true,
                   confirmButtonColor: '#3085d6',
                   cancelButtonColor: '#d33',
                   confirmButtonText: 'Yes'
                 }).then((result) => {
                     
                   if (result.isConfirmed) {
                    localStorage.removeItem('access_token');
                    this.$store.state.Username = null;
                    Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: '로그아웃 되었습니다.',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                // location.href="#/";
                                this.$router.push('/');
                            });
                   } else {
                    return false;
                   }
                 })

        },
        rmodalClose() {
            this.registerModal = false;
        },
        lmodalClose() {
            this.loginModal = false;
        },
        goMypage() {
            this.$router.push('/mypage');
        }
    }
}
</script>
<style scoped>
    .a-addrecipe:hover, .a-myrecipe:hover, .navbar-brand:hover {
        color: gray;   
    }

</style>