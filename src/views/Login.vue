<template>
    <div>
        <NavBar />
        <form v-on:submit.prevent="loginapi">
        <div class="container-md d-flex flex-column align-items-center mt-5 mb-5">
            <h1 class="h1 text-center fw-bold title">로그인</h1>
            <p class="fs-6 text-center">로그인 후 다양한 서비스를 이용하세요.</p>
            <div class="col-sm-10 col-md-4">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput"
                        placeholder="u=UserId" name="username" v-model="id" required maxlength="15"> <label
                        for="floatingInput">아이디</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword"
                        placeholder="Password" name="password" v-model="pw" required maxlength="25"> <label for="floatingPassword">패스워드</label>
                </div>
                <div class="container-fluid p-0 mt-3">
                    <button class="btn w-100 btn-login" type="submit">로그인</button>
                </div>
            </div>
        </div>
        </form>
        <Footer />
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
export default {
    beforeCreate() {
        //로그인 회원은 빠꾸
        this.$store.dispatch('getMemberInfo').then(() => {
                if (this.$store.state.Username != null) {
                    location.href = '#/';
                }
            }
        );
    },
    components: {
        NavBar,
        Footer
    },
    data() {
        return {
            id : '',
            pw : ''
        }
    },
    methods: {
        loginapi() {
            //로그인 -> 토큰 반환
            axios.post('/term/login', { id: this.id, pw: this.pw })
                .then((response)=>{
                    //console.log(response.data);
                    if (response.data !== "" && response.data !== null) {
                        let token = response.data
                        localStorage.setItem('access_token', token);
                        this.$store.dispatch("getMemberInfo");
                        
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '로그인에 성공했습니다.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            // location.href="#/";
                            this.$router.push('/');
                        });
                        
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '로그인에 실패했습니다.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            location.href="#/login";
                            // this.$router.push('/login');
                        });
                        this.id  = '';
                        this.pw = '';
                    }

                }
            );
        }
    }
}
</script>
<style scoped>
    .btn-login {
        border: 1px solid #CCC;
    }
    .btn-login:hover {
        background-color: #212529;
        color: white;
    }
</style>