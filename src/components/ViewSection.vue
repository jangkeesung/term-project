<template lang="">
        <!-- Product section-->
        <section class="py-5 px-5">
            <div class="h1 header-s row px-4 py-4">
                <div class="col-md-9 r_subject">{{ dto.r_subject }}</div>
                <div class="col-md-3 my-2">
                    <h5 class="w-r">{{dto.ct_name}}</h5>
                    <h5 class="w-r">👩‍🍳{{dto.r_writer}}</h5>   
                    <h5 class="w-r">{{dto.r_regdate.substring(0,10)}}</h5>   
                </div>
            </div>
            <!-- <div class="d-flex ingredients">
                <div v-for="(ingredient, index) in dto.ingredientlist" :key="ingredient" class='ingredient px-3'>
                    {{ingredient.i_content}}: {{ingredient.i_quantity}}
                </div>
            </div> -->
            <div class="container px-4 px-lg-5 my-5" v-for="(snapshot, index) in dto.snapshotlist" key="snapshot">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-5"><img class="card-img-top mb-5 mb-md-0 s-img" 
                        v-bind:src="require('@/assets/img/snapshot/'+snapshot.s_pic)"
                        alt="..." /></div>
                    <div class="col-md-7">
                        <div class="small mb-1">Snapshot no.{{index + 1}}</div>
                        <p class="lead">{{snapshot.s_content}}</p>
                    </div>
                </div>
            </div>

            <!-- <div class="mt-5 text-start">
                <span>댓글</span>
                <div v-for="(comment, index) in dto.commentlist" :key="comment" >
                {{comment.cm_writer}}:{{comment.cm_content}}<small>{{cm_regdate}}</small>
                </div>
            </div> -->
            
        </section>

        <!-- 플로팅 버튼 -->
        <div class="box-float">
            <UB />
            <div v-if="this.$store.state.Username == dto.r_writer">
                <div class="btn-float mb-2" @click="editRecipe">수정</div>
                <div class="btn-float mb-2" @click="deleteRecipe">삭제</div>
            </div>
        </div>

        <!-- 로딩 스피너 -->
        <div v-if="isLoading" class="loading-container">
            <div class="loading">
                <Fade-loader />
            </div>
        </div>
</template>
<script>
import axios from 'axios';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import UB from '../components/UpButton.vue';
export default {
    props:['dto'],
    components: { FadeLoader, UB },
    data() {
        return{
            isLoading: false
        };
    },
    methods: {
        deleteRecipe() {

            if (confirm('정말 삭제하시겠습니까? (삭제된 글은 복구되지 않습니다.)')) {
                this.isLoading = true;
                let token = localStorage.getItem("access_token");
                let r_seq = this.dto.r_seq;
                let config = {
                    headers: {
                        "access-token": token
                    },
                    params: {r_seq: r_seq}
                };
                axios.delete('/term/delete-recipe', config)
                .then((response)=>{
                    // console.log(response);
                    if(response.data > 0) {
                        setTimeout(() => {
                            this.$router.push('/');
                            // console.log('delete');
                        }, 1000);
                    } else {
                        alert('게시물 삭제 실패');
                        this.$router.go(0);
                    }
                }).catch((error)=>console.log(error));
            }
        },
        editRecipe() {
            let seq = this.dto.r_seq;
            this.$router.push({name: 'edit', query: { seq }});
        }
    }
}
</script>
<style scoped>
@font-face {
font-family: 'BMHANNAPro';
src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.0/BMHANNAPro.woff') format('woff');
font-weight: normal;
font-style: normal;
}
.lead {
    font-family: 'BMHANNAPro';
}
.s-img {
    border-radius: 10px;
}
.header-s{
    color: white;
    background-color: #212529;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    border-radius: 50px;
}
.loading {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}
.w-r {
    text-align: center;
    margin: 0;
}
.box-float {
    bottom: 8%;
    right: 3%;
    position: fixed;
}
</style>