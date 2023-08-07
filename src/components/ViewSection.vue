<template lang="">
        <!-- Product section-->
        <section class="py-5">
            <h1><small>{{ dto.r_subject }}</small></h1>
            <div>재료 목록
                <div v-for="(ingredient, index) in dto.ingredientlist" :key="ingredient">
                    {{ingredient.i_content}}: {{ingredient.i_quantity}}
                </div>
            </div>
            <div class="container px-4 px-lg-5 my-5" v-for="(snapshot, index) in dto.snapshotlist" key="snapshot">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" v-bind:src="snapshot.s_pic" alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">{{index + 1}}. Snapshot</div>

                        <p class="lead">{{snapshot.s_content}}</p>

                    </div>
                </div>
                <div class="mt-5 text-start">
                    댓글
                    <div v-for="(comment, index) in dto.commentlist" :key="comment" >
                    {{comment.cm_writer}}:{{comment.cm_content}}<small>{{cm_regdate}}</small>
                    </div>
                </div>
            </div>
        </section>
</template>
<script>
export default {
    props:['dto']
}
</script>
<style lang="">
    
</style>