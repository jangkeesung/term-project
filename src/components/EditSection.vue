<template lang="">
    <section class="py-5 px-5 row gx-4 gx-lg-5 align-items-center">
        <form v-on:submit.prevent="onClickFormButton">
            <div>
                <div class="mb-3">
                    <input class="title-box" type="text" name="subject" placeholder="제목을 입력해주세요." required v-model="subject">
                </div>
                <select class="form-select" aria-label="Default select example" name="category" required v-model="category">
                    <option disabled value="">카테고리를 선택하세요</option>
                    <option v-for="(item, index) in categorylist" :key="item" :value="item.seq">{{item.name}}</option>
                </select>
                    <div v-for="(item, index) in snapshot" :key="item">
                        <div class="d-flex mt-5 mb-5 snapshot">
                            <div class="custom-file col-md-6">
                                <div :id="'imagePreview' + index" class="px-5">
                                </div>
                                <input style="display:none;" 
                                :id="'customFile' + index" type="file" 
                                @change="readInputFile($event, index, item.s_seq)" name="pic" accept="image/*"/>
                                <label :for="'customFile' + index" class="btn btn-secondary mt-2 btn-add-pic">사진수정</label>
                            </div>
                            <br>
                            <textarea name="content" v-model="snapshot[index].content" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="내용을 작성해주세요." required></textarea>
                        </div>
                        <!-- <button type="button" class="btn btn-secondary mb-3" @click="deleteSnapshot(index, item.s_seq)">x</button> -->
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
                `<img src="${require('@/assets/img/' + item.opic)}" style="width:100%;"/>`;
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
        readInputFile(e, index, s_seq) {// 미리보기 기능구현
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

            if(confirm('레시피를 수정하시겠습니까?')) {
                this.isLoading = true;
                const formData = new FormData();

                let valid = true; // 모든 사항이 충족됐는지 확인 > 수정에선 불필요
    
                // 수정에서 불 필요
                // if (this.snapshot.length < 1) {
                //     alert('최소 하나 이상의 스냅샷을 작성해주세요.');
                //     return;
                // }
    
                this.snapshot.forEach((item, index) => {
    
                    //수정에서 불 필요
                    // if (item.pic == null) {
                    //     alert('이미지를 첨부해주세요');
                    //     valid = false;
                    //     return;
                    // }
    
                    formData.append('s_seq', item.s_seq);
                    formData.append('content', item.content);
                    formData.append('opic', item.opic);
                    if (!item.pic) {
                        const blob = new Blob([''], { type: 'text/plain' });
                        formData.append('pic', blob, 'dummy.txt');
                    } else {
                        formData.append('pic', item.pic);
                    }
                });
                
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