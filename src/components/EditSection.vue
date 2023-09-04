<template lang="">
    <section class="py-5 px-5 row gx-4 gx-lg-5 align-items-center">
        <form v-on:submit.prevent="onClickFormButton">
            <div class="container">
                <h1 class="pb-5 all-h1">&lt; 레시피 수정 &gt;</h1>
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
                                <!-- <button type="button" class="btn-del" @click="deleteSnapshot(index)"></button> -->
                            </div>
                            <div class="custom-file col-md-5">
                                <div :id="'imagePreview' + index" class="mb-2">
                                    <div class="py-3 imgBox">사진을 등록해주세요.</div>
                                </div>
                                <input style="display:none;" 
                                :id="'customFile' + index" type="file" 
                                @change="readInputFile($event, index)" name="pic" accept=".gif, .jpg, .png, jpeg"/>
                                <label :for="'customFile' + index" class="btn btn-info mt-2 btn-add-pic mb-2">사진 수정</label>
                            </div>
                            <br>
                            <div class="col-md-7">
                                <textarea name="content" v-model="snapshot[index].content" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="내용을 작성해주세요." required></textarea>
                            </div>
                            
                        </div>
                    </div>
            </div>
            <!-- <div class="add-section">
                <button class="btn btn-primary btn-more mb-3 mt-3" @click="addSnapshot" type="button">스냅샷 추가</button>
            </div> -->
        <button class="btn btn-primary" type="submit">수정 완료</button>
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
            isLoading: false, // 로딩스피너
            snapshot: [], // 사용자 눈에 보이는 스냅샷
            categorylist: [], // 셀렉트박스에 출력될 카테고리의 리스트
            subject: '', // 글 제목
            ingredient: [], // 재료 목록, 미구현
            category: '' // 선택한 카테고리

            // 추가 삭제 기능 보류
            // delSnapshot: [], // 
            // updateS_pic: [],
            // updateS_content: [],
            // addedSnapshot: []
        };
    },
    props: ['dto'],
    created() {
        this.$store.dispatch('getMemberInfo').then(()=>{
            if(this.$store.state.Username != this.dto.r_writer) {
                this.$router.go(-1);
                alert('권한이 없습니다.');
                return;
            }
        });

        axios.get("/term/get-category").then((response)=>{
            response.data.forEach((item, index)=>{
                this.categorylist.push({seq: item.ct_seq, name: item.ct_name});
            });
        });

        this.subject = this.dto.r_subject;
        this.category = this.dto.r_category;
        this.dto.snapshotlist.forEach((item, index)=>{
            this.snapshot.push({
                opic: item.s_pic,
                pic: null,
                content: item.s_content,
                s_seq: item.s_seq
            });
        });
    },
    mounted() {
      this.readSnapshot();
    },
    methods: {
        readSnapshot() {
            this.snapshot.forEach((item, index)=>{
                var html = 
                `<img src="${require('@/assets/img/snapshot/' + item.opic)}" style="width:100%; border-radius:10px" class="mb-2""/>`;
                $('#imagePreview' + index).html(html);
            });
        },
        addSnapshot() {
            this.snapshot.push({pic: null, content: '', s_seq: -1});
        },
        deleteSnapshot(index, s_seq) {
            // console.log(s_seq);
            this.delSnapshot.push({
                s_seq: s_seq
            });
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
                if(f.size > 10*1024*1024) {
                    $('#customFile'+index).val("");
                    alert('10MB 이하의 이미지만 첨부 가능합니다.');
                    var html = 
                        `<img src="${require('@/assets/img/snapshot/' + self.snapshot[index].opic)}" style="width:100%; border-radius:10px" class="mb-2""/>`;
                    $('#imagePreview' + index).html(html);
                    return false;
                }
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

            if(confirm('레시피를 수정하시겠습니까?')) {
                this.isLoading = true;
                const formData = new FormData();

                let valid = true; // 모든 사항이 충족됐는지 확인 > 수정에선 불필요
    
                // 수정에서 불 필요
                // if (this.snapshot.length < 1) {
                //     alert('최소 하나 이상의 스냅샷을 작성해주세요.');
                //     return;
                // }

                let totalFileSize = 0;

                this.snapshot.forEach((item, index) => {
                    formData.append('s_seq', item.s_seq);
                    formData.append('content', item.content);
                    formData.append('opic', item.opic);
                    //스냅샷 객체에 사진이 없으면 더미 파일을 저장
                    if (!item.pic) {
                        const blob = new Blob([''], { type: 'text/plain' });
                        formData.append('pic', blob, 'dummy.txt');
                    } else {
                        formData.append('pic', item.pic);
                        totalFileSize += item.pic.size;
                    }
                });

                if (totalFileSize > 209715200) {
                    alert('첨부된 파일의 총 용량은 최대 200MB입니다.');
                    valid = false;
                    this.isLoading = false;
                    return false;
                }
                
                formData.append('r_seq', this.dto.r_seq);
                formData.append('subject', this.subject);
                formData.append('category', this.category);
                // formData.append('writer', this.$store.state.Username); > 수정에서 불필요
    
                if (valid) {
                    
                    await axios.patch('/term/edit-recipe', formData).then((response) => {
                        // console.log(response);
                        setTimeout(() => {
                            let seq = this.dto.r_seq;    
                            this.$router.push({ name: 'recipe', query: { seq } });
                            // location.href="#/view-recipe?seq=" + seq;
                        }, 1000);
                    }).catch((e)=>{console.error('api 요청 에러:', e);});
                    
                }

            } else {
                return;
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