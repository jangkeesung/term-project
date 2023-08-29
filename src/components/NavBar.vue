<template lang="">
        <!-- Navigation-->
        <Register v-if="registerModal" @modalClose="rmodalClose"/>
        <Login v-if="loginModal" @modalClose="lmodalClose"/>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <router-link to="/" class="navbar-brand">OurRecipes</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4" v-if="$store.state.Username != null">
                        <li class="nav-item">
                            <router-link to="/add-recipe" class="nav-link active a-addrecipe" aria-current="page">레시피 등록</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/my-recipe" class="nav-link active a-myrecipe" aria-current="page">내 레시피</router-link>
                        </li>
                        <!-- <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">All Products</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li> -->
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
export default {
    data() {
        return {
            registerModal: false,
            loginModal: false
        };
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
                                location.href="#/";
                                this.$router.push('/');
                            });
                   } else {
                    return;
                   }
                 })

        },
        rmodalClose() {
            this.registerModal = false;
        },
        lmodalClose() {
            this.loginModal = false;
        }
    }
}
</script>
<style scoped>
    .a-addrecipe:hover, .a-myrecipe:hover, .navbar-brand:hover {
        color: gray;   
    }
</style>