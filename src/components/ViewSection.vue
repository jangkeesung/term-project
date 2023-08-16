<template lang="">
        <!-- Product section-->
        <section class="py-5 px-5">
            <h1 class="header-s">{{ dto.r_subject }}</h1>
            <!-- <span>재료 목록</span> -->

            <div class="d-flex ingredients">
                <div v-for="(ingredient, index) in dto.ingredientlist" :key="ingredient" class='ingredient px-3'>
                    {{ingredient.i_content}}: {{ingredient.i_quantity}}
                </div>
            </div>
            <div class="container px-4 px-lg-5 my-5" v-for="(snapshot, index) in dto.snapshotlist" key="snapshot">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0 s-img" 
                        v-bind:src="require('@/assets/img/'+snapshot.s_pic)" 
                        alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">Snapshot no.{{index + 1}}</div>
                        <p class="lead">{{snapshot.s_content}}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex eddel justify-content-center align-items-center" v-if="this.$store.state.Username == dto.r_writer">
                <button type="button" class="btn btn-secondary me-2" @click="editRecipe">수정</button>
                <button type="button" class="btn btn-secondary ms-2" @click="deleteRecipe">삭제</button>
            </div>
            <!-- <div class="mt-5 text-start">
                <span>댓글</span>
                <div v-for="(comment, index) in dto.commentlist" :key="comment" >
                {{comment.cm_writer}}:{{comment.cm_content}}<small>{{cm_regdate}}</small>
                </div>
            </div> -->
            
        </section>
</template>
<script>
import axios from 'axios';

export default {
    props:['dto'],
    methods: {
        deleteRecipe() {  
            Swal.fire({
                   title: '정말 삭제 하시겠습니까? \r\n (삭제된 글은 복구되지 않습니다.)',
                   text: " ",
                   icon: 'warning',
                   showCancelButton: true,
                   confirmButtonColor: '#3085d6',
                   cancelButtonColor: '#d33',
                   confirmButtonText: 'Yes'
                 }).then((result) => {
                     
                   if (result.isConfirmed) {
                    
                    axios.delete('/term/delete-recipe',{ params: {r_seq: this.dto.r_seq }})
                    .then((response)=>{
                        if(response.data > 0) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: '레시피가 삭제되었습니다.',
                                showConfirmButton: false,
                                timer: 1000
                            }).then(() => {
                                location.href="#/";
                            });
                        }
                    })
                    .catch((e)=>console.log(e));
                    
                }
            });
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
        height: 8rem;
        color: white;
        background-color: #212529;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
    }
    .ingredient {
        border: 1px solid #AAA;
        border-radius: 10px;
        margin: 5px 5px;
    }
    .ingredients {
        justify-content: center;
    }

    .eddel {
    }
</style>