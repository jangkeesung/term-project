<template lang="">
<section class="container-md d-flex justify-content-center p-5">
		<div class="d-flex align-content-center justify-content-center w-100 m-5 p-5"> 
			<div
				class="col-sm-12 col-md-12 col-lg-5 p-0 bg-white d-flex align-items-center rounded-end pt-4 pb-4 justify-content-center">
				<div class="container-md d-flex flex-column align-items-center">
					<h1 class="h2 text-center fw-bold title">개인 회원가입</h1>
					<p class="fs-6 text-center">회원가입 후 다양한 서비스를 이용하세요.</p>
					
					<form class="w-75" id="formregister" v-on:submit.prevent="submitRegister">
					
						<div class="mb-1">아이디</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="userid" v-model="id" @input="idcheck"
								placeholder="name@example.com" name="m_id" required> <label
								for="floatingInput">4~15자(알파벳, 숫자 가능)</label>
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
							<input type="text" class="form-control" id="name" v-model="name" @input="namecheck"
								placeholder="name" name="m_name" required> <label for="floatingPassword">한글 이름</label>
						</div>
						<!-- <div class="mb-1">생년월일</div>
						<div class="form-floating mb-3">
							<input type="date" class="form-control" id="birth"
								placeholder="name" name="m_birth" required> <label for="floatingPassword">날짜를
								골라주세요</label>
						</div> -->
						<!-- <div class="mb-1">주소</div>
						<div class="form-floating btn-group mb-3 w-100">
							<input type="text" class="form-control" id="sample6_address"
								placeholder="name" name="m_address" readonly required> 
								<label for="floatingPassword">주소를 검색해주세요</label>
							<input type="button" class="btn" value="주소 검색" onclick="sample6_execDaumPostcode();">
						</div>
						<div class="mb-1">상세 주소</div>
						<div class="form-floating mb-3">
							<input type="text" class="form-control" id="address_detail"
								placeholder="name" name="m_address_detail" required> <label for="floatingPassword">상세 주소를 입력해주세요</label>
						</div> -->
						<!-- <div class="mb-1">이메일</div>
						<div class="form-floating mb-3">
							<input type="email" class="form-control" id="email"
								placeholder="tel" name="m_email" required> <label for="floatingPassword">user@ham.com</label>
						</div> -->
						<div class="mb-1">연락처</div>
						<div class="form-floating">
							<input type="text" class="form-control" id="tel"
								placeholder="tel" name="m_tel" required v-model="tel" @input="telcheck"> <label for="floatingPassword">"-"
								없이 입력해주세요</label>
						</div>
						<div class="container-fluid p-0 mt-3">
							<button type="submit" class="btn w-100 btn-primary" id="btnregister">회원가입</button>
						</div>
					</form>
					
				</div>
			</div>

		</div>
	</section>
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
                axios.post('/term/register', null, {params: {
                    id: this.id,
                    pw: this.pw,
                    name: this.name,
                    tel: this.tel
                }})
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
                            location.href="#/login";
                        });
                    }
                })
                .catch((e)=>console.error(e));
            }

        },
        idcheck() {
            console.log(this.id);
            var idInput = document.getElementById('userid');
            var idPattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,15}$/;
            this.idIsValid = idPattern.test(this.id);

            axios.get('/term/idcheck', {params: {id: this.id}})
            .then((result)=>{

                console.log(result.data);
                console.log(this.idIsValid);
			    		  
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
            var namePattern = /^[가-힣]{1,5}$/;

            this.nameIsValid = namePattern.test(this.name);
            
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
            var telPattern =  /^\d{2,3}\d{3,4}\d{4}$/;
            
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
<style lang="">
    
</style>