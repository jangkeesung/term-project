<template lang="">
    <section class="py-5 px-5 row gx-4 gx-lg-5 align-items-center">
        <form v-on:submit.prevent="onClickFormButton">
            <div>
                <div class="mb-3">
                    <input class="title-box" type="text" name="subject" placeholder="제목을 입력해주세요." required v-model="subject">
                </div>
                <select class="form-select" aria-label="Default select example" name="category" required v-model="category">
                    <option disabled value="">카테고리를 선택하세요</option>
                    <option v-for="(item, index) in categorylist" :key="item"  :value="item.seq">{{item.name}}</option>
                </select>
                    <div v-for="(item, index) in snapshot" :key="item">
                        <div class="d-flex mt-5 mb-5 snapshot">
                            <div class="custom-file col-md-6">
                                <div :id="'imagePreview' + index" class="px-5"></div>
                                <input style="display:none;" 
                                :id="'customFile' + index" type="file" 
                                @change="readInputFile($event, index)" name="pic"/>
                                <label :for="'customFile' + index" class="btn btn-secondary mt-2 btn-add-pic">사진등록</label>
                            </div>
                            <br>
                            <textarea name="content" v-model="snapshot[index].content" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="내용을 작성해주세요." required></textarea>
                        </div>
                        <button type="button" class="btn btn-secondary mb-3" @click="deleteSnapshot(index)">x</button>
                    </div>
            </div>
            <div class="add-section">
                <button class="btn btn-primary btn-more mb-3 mt-3" @click="addSnapshot" type="button">스냅샷 추가</button>
            </div>
        <button class="btn btn-primary" type="submit">레시피 등록하기</button>
    </form>
    </section>
    <div v-if="isLoading" class="loading-container">
        <div class="loading">
            <Fade-loader />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
export default {
    components: { FadeLoader },
    data() {
        return{
            isLoading: false, // 로딩 스피너
            snapshot: [{pic: null, content: ''}],
            categorylist: [],
            subject: '',
            ingredient: [],
            category: ''
        };
    },
    created() {
        axios.get("/term/get-category").then((response)=>{
            response.data.forEach((item, index)=>{
                this.categorylist.push({seq: item.ct_seq, name: item.ct_name});
            });
        });
    },
    methods: {
        addSnapshot() {
            this.snapshot.push({pic: null, content: ''});
        },
        deleteSnapshot(index) {
            this.snapshot.splice(index, 1);
        },
        readInputFile(e, index) {// 미리보기 기능구현
            const self = this;
            $('#imagePreview'+index).empty();
            var files = e.target.files;
            var fileArr = Array.prototype.slice.call(files);
            // console.log(fileArr);
            fileArr.forEach(function(f){
                if(!f.type.match("image/.*")){
                    alert("이미지 확장자만 업로드 가능합니다.");
                    return;
                };
                var reader = new FileReader();
                reader.onload = function(e){
                    var html = `<img src=${e.target.result} style="width:100%;"/>`;
                    $('#imagePreview' + index).html(html);
                    self.snapshot[index].pic = files[0];
                    // console.log(self.snapshot);
                };
                reader.readAsDataURL(f);
            })
        },
         async onClickFormButton() {

            if (confirm('레시피를 등록하시겠습니까?')) {
                this.isLoading = true;
                const formData = new FormData();
    
                let valid = true; // 모든 사항이 충족됐는지 확인
    
                if (this.snapshot.length < 1) {
                    alert('최소 하나 이상의 스냅샷을 작성해주세요.');
                    return;
                }
    
                this.snapshot.forEach((item, index) => {
                    if (item.pic == null) {
                        alert('이미지를 첨부해주세요');
                        valid = false;
                        return;
                    }
    
                    formData.append('pic', item.pic);
                    formData.append('content', item.content);
                });
    
                formData.append('subject', this.subject);
                formData.append('category', this.category);
                formData.append('writer', this.$store.state.Username);
    
                if (valid) {
                    await axios.post('/term/add-recipe', formData).then((response) => {
                        if (response.data.r_seq != null) {
                            setTimeout(() => {
                                let seq = response.data.r_seq;
                                console.log(seq);
                                this.$router.push({ name: 'recipe', query: { seq } });
                                // location.href="#/view-recipe?seq=" + seq;
                            }, 1000);
                        }

                    }).catch((e)=>{ console.error('api 요청 에러:', e);});
                
                }

            } else {
                return;
            }

            // Swal.fire({
            //        title: '레시피를 등록하시겠습니까?',
            //        text: " ",
            //        icon: 'warning',
            //        showCancelButton: true,
            //        confirmButtonColor: '#3085d6',
            //        cancelButtonColor: '#d33',
            //        confirmButtonText: 'Yes'
            //     }).then((result) => {
                    
            //     if (result.isConfirmed) {
                    
    
            //     }

            // });
        }
    }
}

</script>
<style scoped>
    li {
        list-style-type: none;
    }
    .snapshot {
        padding: 10px;
        border: 1px solid #EEE;
    }
    .title-box {
	width: 100%;
	padding: 10px;
	border: 1px solid #878787;
	border-radius: 5px;
	margin-bottom: 15px;
}
.title-box:focus,
.title-box {
	outline-color: #ADB5BD;
}
.loading {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}
</style>