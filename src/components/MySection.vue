<template lang="">
    <h1 class="all-h1 mt-5">&lt; 마이 페이지 &gt;</h1>
    <section class="py-5 gx-4 gx-lg-5 d-flex px-5">
        <form id="form-nt" v-on:submit.prevent="onClickFormNT" class="col-md-6 px-5">
            <div class="container">
                <div class="mb-1">이름</div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" v-model="name" @keyup="namecheck" maxlength="6"
                    placeholder="name" name="m_name" autocomplete="off" required> <label for="floatingPassword">한글 이름</label>
                </div>
                <div class="mb-1">연락처</div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="tel" maxlength="13"
                    placeholder="tel" name="m_tel" required v-model="tel" @input="telcheck" autocomplete="off"> <label for="floatingPassword">"-"
                        없이 입력해주세요</label>
                </div>
                <button type="submit" class="btn btn-primary mt-2">개인정보 수정</button>
            </div>
        </form>
        <form id="form-pw" v-on:submit.prevent="onClickFormPW" class="col-md-6 px-5">
        <div class="container">
            <div class="mb-1">현재 비밀번호</div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="oldpassword" v-model="opw"
                placeholder="Password" name="m_pw" required maxlength="25"> <label for="floatingPassword">
                    현재 비밀번호를 입력해주세요.</label>
            </div>
            <div class="mb-1">새 비밀번호</div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" v-model="npw" @input="pwcheck"
                placeholder="Password" name="m_pw" required maxlength="25"> <label for="floatingPassword">
                    6~25자(알파벳, 숫자 필수)</label>
            </div>
            <div class="mb-1">새 비밀번호 확인</div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="passwordcheck" v-model="cpw" @input="pwccheck"
                placeholder="Password" required maxlength="25"> <label for="floatingPassword">비밀번호를
                다시 입력하세요.</label>
            </div>
            <button type="submit" class="btn btn-primary mt-2">비밀번호 수정</button>
        </div>
    </form>

    </section>
    </template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            opw: "", //기존 비밀번호
            npw: "", //새 비밀번호
            cpw: "", //새 비밀번호 확인
            name: "",
            tel: "",
            pwIsValid: false,
            pwcIsValid: false,
            nameIsValid: true,
            telIsValid: true
        };
    },
    created() {
        this.name = this.$store.state.m_name;
        this.tel = this.$store.state.m_tel;
    },
    methods: {
        pwcheck() {
            var pwInput = document.getElementById('password');
            var pwPattern =  /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/


            this.pwIsValid = pwPattern.test(this.npw);
            
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
            
            this.pwcIsValid = (this.npw == this.cpw);
            
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
        },
        onClickFormNT() {
            if (this.name == this.$store.state.m_name && this.tel == this.$store.state.m_tel) {
                alert('변경된 내용이 없습니다.');
            } else if (this.nameIsValid && this.telIsValid) {
                axios.post('/term/update-info', {name: this.name, tel: this.tel, id:this.$store.state.Username})
                .then((response)=>{
                    document.getElementById('tel').classList.remove('is-valid');
                    document.getElementById('name').classList.remove('is-valid');
                    if (response.data > 0) {
                        //갱신
                        this.$store.dispatch('getMemberInfo').then(()=>{
                            this.name = this.$store.state.m_name;
                            this.tel = this.$store.state.m_tel;
                        });
                        alert("개인정보가 변경되었습니다.");
                    } else {
                        alert('개인정보 변경에 실패하였습니다.');
                        return false;
                    }
                })
                .catch(e=>console.error(e));
            } else {
                alert("입력란을 다시 확인해주세요.");
                return false;
            }
        },
        onClickFormPW() {
            // console.log(this.pwIsValid);
            // console.log(this.pwcIsValid);
            if (this.pwIsValid && this.pwcIsValid) {
                axios.post("/term/update-pw",{opw: this.opw, npw: this.npw, id: this.$store.state.Username})
                .then((response)=>{
                    if (response.data == 1) {
                        alert('비밀번호 변경 완료.');
                    } else if(response.data == -100) {
                        alert('현재 비밀번호가 일치하지 않습니다.');
                    } else {
                        alert('비밀번호 변경 실패');
                    }
                    document.getElementById('password').classList.remove('is-valid');
                    document.getElementById('passwordcheck').classList.remove('is-valid');
                    this.opw = '';
                    this.npw = '';
                    this.cpw = '';
                })
                .catch(e=>console.error(e));
            } else {
                alert("입력란을 다시 확인해주세요.");
                return false;                
            }

        }

    }
}
</script>
<style lang="">
    
</style>