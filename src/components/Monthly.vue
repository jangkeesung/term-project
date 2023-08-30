<template lang="">
    <!-- Section-->
    <div class="monthly" v-if="recipes">
        <div class="container px-4 px-lg-5">
            <h1 class="py-5 mon-h1">&lt; 이달의 레시피 &gt;</h1>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" v-if="recipes.length > 0">
                <div class="col mb-5 card-parent" v-for="(recipe, index) in recipes" key="recipe">
                    <div class="card h-100 card-recipe" @click="this.linkView(recipe.r_seq)">
                        <!-- Product image require('@/assets/img/'+recipe.snapshotlist[0].s_pic) -->
                        <img class="card-img-top img-list" v-bind:src="require('@/assets/img/snapshot/'+recipe.r_pic)" alt="..." />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{{recipe.r_subject}}</h5>
                                <!-- Product price-->
                                {{recipe.r_category}}({{recipe.r_writer}})
                            </div>
                            <div>{{recipe.r_regdate.substr(0,10)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 v-else>아직 이달의 레시피가 없습니다.<br><br> 당신의 레시피를 등록하세요!<br><br></h2>
        </div>
    </div>
</template>
<script>
export default {
props: ['recipes'],
methods: {
    linkView(seq) {
        // this.$store.state.r_seq = recipe.r_seq;
        this.$router.push({name: 'recipe', query: { seq }});
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
.card-recipe {
    cursor: pointer;
    box-shadow: 2px 2px 2px gray;
    background-color: #F8F2DC;  

}
.card-parent:nth-child(odd) .card-recipe {
    transform: rotate(-3.5deg);
}
.card-parent:nth-child(even) .card-recipe {
    transform: rotate(3.5deg);
}
.monthly {
    position : relative;
}
.monthly::after {
  width: 100%;
  height: 100%;
  content: "";
  background-image: url('@/assets/img/monthly.jpg');
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
.mon-h1 {
    font-family: 'BMHANNAPro';
}
</style>