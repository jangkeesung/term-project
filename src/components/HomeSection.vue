<template lang="">
        <!-- Section-->
        <section class="py-5" v-if="recipes">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5 card-recipe" v-for="(recipe, index) in recipes" key="recipe" @click="this.linkView(recipe.r_seq)">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top img-list" v-bind:src="recipe.snapshotlist[0].s_pic" alt="..." />
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
            </div>
        </section>
</template>
<script>
import axios from 'axios';
export default {
    created() {
        axios.get('/term/recipelist').then((response)=>{
          this.recipes = response.data;
      });
    },
    data() {
        return {
            recipes: null
        }
    },
    methods: {
        linkView(seq) {
            // this.$store.state.r_seq = recipe.r_seq;
            this.$router.push({name: 'recipe', query: { seq }});
        }
    }
}
</script>
<style scope>
    .card-recipe {cursor: pointer;}
</style>