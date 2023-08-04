<template lang="">
        <!-- Section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5" v-for="(recipe, index) in recipes" key="recipe">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top img-list" v-bind:src="recipe.snapshotlist[0].s_pic" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">{{recipe.r_subject}}</h5>
                                    <!-- Product price-->
                                    {{recipe.r_category}}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
</template>
<script>
import axios from 'axios';
export default {
    created() {
        axios.get('/term/recipelist').then((response)=>{
          this.recipes = response.data;
        //   response.data.forEach(element => {
        //     let recipe = {
        //         r_seq: element.r_seq,
        //         r_category: element.r_category,
        //         r_regdate: element.r_regdate,
        //         r_readcount: element.r_readcount,
        //         r_subject: element.r_subject,
        //         snapshotlist: [],
        //         commentlist: [],
        //         ingredientlist: []
        //     };
        //     element.snapshotlist.forEach(element =>{
        //         recipe.snapshotlist.push(element);
        //         // console.log(element);
        //     });
        //     element.commentlist.forEach(element =>{
        //         recipe.commentlist.push(element);
        //         // console.log(element);
        //     });
        //     element.ingredientlist.forEach(element =>{
        //         recipe.ingredientlist.push(element);
        //         // console.log(element);
        //     });
        //     this.recipes.push(recipe);
        // });
      });
    },
    data() {
        return {
            recipes: []
        }
    }
}
</script>
<style lang="">
    
</style>