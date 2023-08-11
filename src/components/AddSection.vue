<template lang="">
    <section class="py-5 px-5 row gx-4 gx-lg-5 align-items-center">
        <form v-on:submit.prevent="onClickFormButton">
            <div>
                <div class="mb-3">
                    <input class="title-box" type="text" name="subject" placeholder="제목을 입력해주세요." required v-model="subject">
                </div>
                <select class="form-select" aria-label="Default select example" name="category" required v-model="category">
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
                <button class="btn btn-primary btn-more mb-3 mt-3" @click="addSnapshot" type="button">항목 추가</button>
            </div>
        <button class="btn btn-primary" type="submit">등록하기</button>
    </form>
    </section>
</template>
<script>
import axios from 'axios';
import $ from 'jquery'; 
export default {
    data() {
        return{
            snapshot: [{pic: null, content: ''}],
            categorylist: [],
            subject: '',
            ingredient: [],
            category: ''
        };
    },
    created() {
        console.log('created');
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
        onClickFormButton() {
            const formData = new FormData();

            let pic = [];
            let content = [];
            let valid = true; // 모든 사항이 충족됐는지 확인

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
            formData.append('writer', this.$store.state.User.id);

            if (valid) {
                try {
                    axios.post('/term/add-recipe', formData).then((response) => {
                        // console.log(response);
                        if(response.data) {
                            Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '레시피 등록완료!',
                            showConfirmButton: false,
                            timer: 1500
                            }).then(() => {
                                location.href="#/";
                            });
                        }
                    });
                } catch (e) {
                    console.error('api 요청 에러:', e);
                }
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
</style>