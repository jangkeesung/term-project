<template lang="">
    <section class="py-5 px-5 row gx-4 gx-lg-5 align-items-center">
        <form v-on:submit.prevent="onClickFormButton">
            <div class="container">
                <h1 class="pb-5 all-h1">&lt; 레시피 등록 &gt;</h1>
                <div class="d-flex row">
                    <div class="col-md-10">
                        <input class="title-box" type="text" name="subject" placeholder="제목을 입력해주세요." required v-model="subject" autocomplete="off">
                    </div>
                    <div class="col-md-2">
                        <select class="form-select" aria-label="Default select example" name="category" required v-model="category">
                            <option disabled value="">카테고리</option>
                            <option v-for="(item, index) in categorylist" :key="item"  :value="item.seq">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                    <div v-for="(item, index) in snapshot" :key="item">
                        <div class="row mt-2 mb-5 snapshot">
                            <div class="d-flex justify-content-around mb-2">
                                <h4 class="col-11">Snapshot no.{{index+1}}</h4>
                                <button type="button" class="btn-del" @click="deleteSnapshot(index)"></button>
                            </div>
                            <div class="custom-file col-md-5">
                                <div :id="'imagePreview' + index" class="mb-2">
                                    <div class="py-3 imgBox">사진을 등록해주세요.</div>
                                </div>
                                <input style="display:none;" 
                                :id="'customFile' + index" type="file" 
                                @change="readInputFile($event, index)" name="pic" accept=".gif, .jpg, .png, jpeg"/>
                                <label :for="'customFile' + index" class="btn btn-info mt-2 btn-add-pic mb-2">사진 등록</label>
                            </div>
                            <br>
                            <div class="col-md-7">
                                <textarea name="content" v-model="snapshot[index].content" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="내용을 작성해주세요." required></textarea>
                            </div>
                            
                        </div>
                    </div>
            </div>
            <div class="add-section">
                <button class="btn btn-success btn-more mb-3 mt-3 mx-5" @click="addSnapshot" type="button">스냅샷 추가</button>
                <button class="btn btn-primary mx-5" type="submit">레시피 등록</button>
            </div>
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
        axios.get("/term/get-category")
        .then((response)=>{
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
            if (this.snapshot.length < 2) {
                alert('최소 하나의 이상의 스냅샷이 존재해야 합니다.');
                return false;
            }
            this.snapshot.splice(index, 1);
        },
        readInputFile(e, index) {// 미리보기 기능구현
            const self = this;
            $('#imagePreview'+index).empty();
            var files = e.target.files;
            var fileArr = Array.prototype.slice.call(files);
            // console.log(fileArr);
            fileArr.forEach(function(f){
                if(!f.type.match("image/jpeg|image/jpg|image/png|image/gif")){
                    $('#customFile'+index).val("");
                    alert("이미지 확장자만 업로드 가능합니다.");
                    return;
                };
                var reader = new FileReader();
                reader.onload = function(e){
                    var html = `<img src=${e.target.result} style="width:100%; border-radius:10px" class="mb-2"/>`;
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

                    await axios.post('/term/add-recipe', formData, {maxRedirects: 0})
                    .then((response) => {
                        // console.log(response);
                        setTimeout(() => {
                            let seq = response.data.r_seq;
                            this.$router.push({ name: 'recipe', query: { seq } });
                            // location.href="#/view-recipe?seq=" + seq;
                        }, 1000);
                    }).catch((e)=>{ console.error('게시글 등록 실패 api 요청 에러:', e);});
                
                }

            } else {
                return false;
            }

        }
    }
}

</script>
<style scoped>
    li {
        list-style-type: none;
    }
    .snapshot {
        padding: 15px;
        /* border: 5px solid burlywood; */
        border-radius: 10px;
        background-color: #EEE;
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
#exampleFormControlTextarea1 {
    /* min-height: 340px; */
    height: 100%;
    resize: none;
}
.imgBox {
    min-height: 250px;
    border-radius: 10px;
    background-color: #FFF;
}

.btn-del {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-image: url('@/assets/img/trash.png');
    background-size: cover;
    border: none;
}
.btn-del:hover {
    box-shadow: 0px 0px 5px 1px #808080;
}

</style>