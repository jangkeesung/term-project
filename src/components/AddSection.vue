<template lang="">
    <section class="py-5 px-5 row gx-4 gx-lg-5 align-items-center">
        <div>
            <div class="mb-3">
	            <input class="title-box" type="text" name="title" placeholder="제목을 입력해주세요.">
			</div>
            <ul>
                <li v-for="(item, index) in snapshot" :key="item">
                    <div class="d-flex mt-5 mb-5 snapshot">
                        <div class="custom-file col-md-6">
                            <div :id="'imagePreview' + index" class="px-5"></div>
                            <input style="display:none;" 
                                :id="'customFile' + index" type="file" 
                                @change="readInputFile($event, index)"/>
                                <label :for="'customFile' + index" class="btn btn-secondary mt-2 btn-add-pic">사진등록</label>
                        </div>
                        <br>
                        <textarea v-model="snapshot[index].content" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="내용을 작성해주세요."></textarea>
                    </div>
                </li>
            </ul>
        </div>
        <div class="add-section">
            <button class="btn btn-primary btn-more mb-3" @click="addSnapshot">추가</button>
        </div>
        
        <button class="btn btn-primary" @click="onClickFormButton">등록하기</button>
    </section>
</template>
<script>
import axios from 'axios';
import $ from 'jquery'; 
export default {
    data() {
        return{
            snapshot: [{pic: null, content: ''}]
        };
    },
    computed: {
        countUp: function() {
            return 'imagePreview' + this.cnt;
        }
    },
    methods: {
        addSnapshot() {
            this.snapshot.push({pic: null, content: ''});
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

            this.snapshot.forEach((item, index) => {
                // pic.push(item.pic);
                // content.push(item.content);
                formData.append('pic', item.pic);
                formData.append('content', item.content);
            });


            try {
                axios.post('/term/add-recipe/', null, formData).then((response) => {
                    console.log(response);
                });
            } catch (e) {
                console.error('api 요청 에러:', e);
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

    .btn-more {
        
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