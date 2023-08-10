<template lang="">
        <!-- Product section-->
        <section class="py-5 px-5">
            <h1><small>{{ dto.r_subject }}</small></h1>
            <span>재료 목록</span>
            <div class="d-flex ingredients">
                <div v-for="(ingredient, index) in dto.ingredientlist" :key="ingredient" class='ingredient px-3'>
                    {{ingredient.i_content}}: {{ingredient.i_quantity}}
                </div>
            </div>
            <div class="container px-4 px-lg-5 my-5" v-for="(snapshot, index) in dto.snapshotlist" key="snapshot">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" 
                        v-bind:src="require('@/assets/img/'+snapshot.s_pic)" 
                        alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">{{index + 1}}. Snapshot</div>

                        <p class="lead">{{snapshot.s_content}}</p>

                    </div>
                </div>
            </div>
            <div class="mt-5 text-start">
                <span>댓글</span>
                <div v-for="(comment, index) in dto.commentlist" :key="comment" >
                {{comment.cm_writer}}:{{comment.cm_content}}<small>{{cm_regdate}}</small>
                </div>
            </div>
        </section>
</template>
<script>
export default {
    props:['dto']
}
</script>
<style scoped>
    .ingredient {
        border: 1px solid #AAA;
        border-radius: 10px;
        margin: 5px 5px;
    }
    .ingredients {
        justify-content: center;
    }
</style>