<template lang="">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <router-link to="/" class="navbar-brand">OurRecipes</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/view-recipe" class="nav-link active" aria-current="page">recipe</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">All Products</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex">

                        <button v-if="$store.state.User == null" class="btn btn-outline-dark me-3" @click="this.$router.push('/login');">
                            로그인                            
                        </button>
                        <button v-if="$store.state.User == null" class="btn btn-outline-dark me-3" @click="this.$router.push('/register');">
                            회원가입                            
                        </button>
                        <!-- <button v-if="$store.state.User != null" class="btn btn-outline-dark me-3" @click="this.$router.push('/mypage');">
                            <i class="bi bi-person-fill me-1"></i>
                            마이페이지                          
                        </button> -->
                        <button v-if="$store.state.User != null" class="btn btn-outline-dark me-3" @click="logout();">
                            로그아웃                          
                        </button>

                    </div>
                </div>
            </div>
        </nav>
</template>
<script>

export default {
    methods: {
        logout() {
            if(confirm('로그아웃 하시겠습니까?')) {
                localStorage.removeItem('access_token');
                this.$store.state.User = null;
            } else {
                return;
            }
        }
    }
}
</script>
<style lang="">
    
</style>