<template lang="">
    <div class="black-bg d-flex justify-content-center">
            <form v-on:submit.prevent="loginapi">
                <div class="d-flex flex-column align-items-center mt-5 mb-5 white-bg">
                    <div class="quit" @click="$emit('modalClose')">X</div>
                    <h1 class="h1 text-center fw-bold title">로그인</h1>
                    <p class="fs-6 text-center">로그인 후 다양한 서비스를 이용하세요.</p>
                    <div class="col-10">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"
                            placeholder="u=UserId" name="username" v-model="id"> <label
                            for="floatingInput">아이디</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword"
                            placeholder="Password" name="password" v-model="pw"> <label for="floatingPassword">패스워드</label>
                        </div>
                        <div class="container-fluid p-0 mt-3">
                            <button class="btn w-100 btn-primary" type="submit">로그인</button>
                        </div>
                    </div>
        </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
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
                            this.$emit('modalClose');
                        });
                        
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '로그인에 실패했습니다.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            this.$emit('modalClose');
                            location.href="#/login";
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
body {
  margin : 0;
}
div {
    box-sizing: border-box;
}
.black-bg {
    width: 100%; height:100%;
    background: rgba(0,0,0,0.5);
    position: fixed; padding: 20px;
    z-index: 999;
}
.white-bg {
    min-width: 370px; 
    background: white;
    border-radius: 8px;
    padding: 20px;
}
.quit {
    position: relative;
    /* right: -165px; */
    right: -50%;
    border-radius: 5px;
    background-color: #333;
    width: 25px;
    height: 23px;
    color: white;
    cursor: pointer;
}
/* .btn-login {
        border: 1px solid #CCC;
}
.btn-login:hover {
    background-color: #212529;
    color: white;
} */
</style>