<template lang="">
    <div class="black-bg d-flex justify-content-center">
        <form v-on:submit.prevent="submitRegister">
		<!-- <div class="d-flex align-content-center justify-content-center w-100 m-5 p-5">  -->
			<!-- <div class="col-sm-5 col-md-5 col-lg-5 p-0 bg-white d-flex align-items-center rounded-end pt-4 pb-4 justify-content-center"> -->
				<div class="d-flex flex-column align-items-center mt-5 mb-5 white-bg">
					<div class="quit" @click="$emit('modalClose')">X</div>
					<h1 class="h1 text-center fw-bold title">회원 가입</h1>
					<p class="fs-6 text-center">회원가입 후 다양한 서비스를 이용하세요.</p>
					<div class="col-11">
						<div class="mb-1">아이디</div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="userid" v-model="id" @click="idclick"
								placeholder="name@example.com" name="m_id" required autocomplete="off" maxlength="15"> <label
								for="floatingInput">4~15자(알파벳, 숫자 가능)</label>
                            <button type="button" class="btn btn-warning mt-3" @click=idcheck>아이디 중복 검사</button>
                        </div>
						<div class="mb-1">비밀번호</div>
						<div class="form-floating mb-3">
							<input type="password" class="form-control" id="password" v-model="pw" @input="pwcheck"
								placeholder="Password" name="m_pw" required> <label for="floatingPassword">
								6~25자(알파벳, 숫자 필수)</label>
						</div>
						<div class="mb-1">비밀번호 확인</div>
						<div class="form-floating mb-3">
							<input type="password" class="form-control" id="passwordcheck" v-model="pwc" @input="pwccheck"
								placeholder="Password" required> <label for="floatingPassword">비밀번호를
								다시 입력하세요</label>
						</div>
						<div class="mb-1">이름</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="name" v-model="name" @keyup="namecheck" maxlength="6"
								placeholder="name" name="m_name" autocomplete="off" required> <label for="floatingPassword">한글 이름</label>
						</div>
						<div class="mb-1">연락처</div>
						<div class="form-floating">
							<input type="text" class="form-control" id="tel" maxlength="13"
								placeholder="tel" name="m_tel" required v-model="tel" @input="telcheck" autocomplete="off"> <label for="floatingPassword">"-"
								없이 입력해주세요</label>
						</div>
						<div class="container-fluid p-0 mt-3">
							<button class="btn w-100 btn-primary" type="submit">회원가입</button>
						</div>
					</div>		
                </div>
            </form>
	</div>
</template>
<script>
import $ from 'jquery';
import axios from 'axios';
export default {

    data() {
        return{
            id: '',
            pw: '',
            pwc: '',
            name: '',
            tel: '',
            idIsValid: false,
            pwIsValid: false,
            pwcIsValid: false,
            nameIsValid: false,
            telIsValid: false
        };
    },
    methods: {
        submitRegister() {

            if(this.idIsValid && this.pwIsValid && this.pwcIsValid && this.nameIsValid && this.telIsValid) {
                axios.post('/term/register', {
                    id: this.id,
                    pw: this.pw,
                    name: this.name,
                    tel: this.tel
                })
                .then((response)=>{
                    if(response.data == 1) {
                        //스위트알랏으로 성공여부 보여주고 로그인 페이지로 이동
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '회원가입에 성공했습니다.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            this.$emit('modalClose');
                            this.$router.push('/login');
                        });
                    } else {
                        if (response.data == -100) {
                            console.log('아이디 중복');
                        }
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '회원가입에 실패했습니다.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            this.$emit('modalClose');
                            this.id  = '';
                            this.pw = '';
                            this.name = '';
                            this.tel = '';
                        });
                    }
                })
                .catch((e)=>console.error(e));
            } else {
                alert('입력란을 다시 확인해주세요.');
                return false;
            }

        },
        idclick() {
            var idInput = document.getElementById('userid');
            this.idIsValid = false;
            idInput.classList.add('is-invalid');
            $('#userid + label').text('아이디 중복 검사를 해주세요.');
        },
        idcheck() {
            // console.log(this.id);
            // this.idIsValid = false;
            var idInput = document.getElementById('userid');
            var idPattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,15}$/;
            this.idIsValid = idPattern.test(this.id);

            axios.get('/term/idcheck', {params: {id: this.id}})
            .then((result)=>{

                // console.log(result.data);
                // console.log(this.idIsValid);
			    		  
                if (this.idIsValid && result.data == 0) {
                    $('#userid + label').text('사용할 수 있는 아이디입니다.');
                    idInput.classList.remove('is-invalid');
                    idInput.classList.add('is-valid');
                } else {
                    if (result.data > 0) {
                        $('#userid + label').text('아이디가 중복됩니다.');
                    } else {
                        $('#userid + label').text('4~15자 이내로 입력해주세요');
                    }
                    
                    idInput.classList.remove('is-valid');
                    idInput.classList.add('is-invalid');
                }

            })
            .catch((e)=>console.error(e));

        },
        pwcheck() {
            var pwInput = document.getElementById('password');
            var pwPattern =  /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/


            this.pwIsValid = pwPattern.test(this.pw);
            
            if (this.pwIsValid) {
                pwInput.classList.remove('is-invalid');
                pwInput.classList.add('is-valid');
            } else {
                pwInput.classList.remove('is-valid');
                pwInput.classList.add('is-invalid');
            }

            this.pwccheck();

        },
        pwccheck() {
            var pwcInput = document.getElementById('passwordcheck');
            
            this.pwcIsValid = (this.pw == this.pwc);
            
            if (this.pwcIsValid) {
                pwcInput.classList.remove('is-invalid');
                pwcInput.classList.add('is-valid');
            } else {
                pwcInput.classList.remove('is-valid');
                pwcInput.classList.add('is-invalid');
            }
        },
        namecheck() {
            var nameInput = document.getElementById('name');
            var namePattern = /^[가-힣]{2,6}$/;

            this.nameIsValid = namePattern.test(nameInput.value);
            
            if (this.nameIsValid) {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            } else {
                nameInput.classList.remove('is-valid');
                nameInput.classList.add('is-invalid');
            }
        },
        telcheck() {
            var telInput = document.getElementById('tel');
            var telPattern =  /^\+?\d{2,4}\d{3,4}\d{4}$/
            
            this.telIsValid = telPattern.test(this.tel);
            
            if (this.telIsValid) {
                telInput.classList.remove('is-invalid');
                telInput.classList.add('is-valid');
            } else {
                telInput.classList.remove('is-valid');
                telInput.classList.add('is-invalid');
            }
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
    height: 90%;
    border-radius: 8px;
    padding: 20px; 
    overflow-y: auto;
    overflow-x: hidden;
}
.white-bg::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
.quit {
    position: relative;
    right: -50%;
    border-radius: 5px;
    background-color: #333;
    width: 25px;
    height: 23px;
    color: white;
    cursor: pointer;
}
</style>