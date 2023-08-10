<template lang="">
        <!-- Section-->
        <section class="py-5" v-if="recipes">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5" v-for="(recipe, index) in recipes" key="recipe">
                        <div class="card h-100 card-recipe" @click="this.linkView(recipe.r_seq)">
                            <!-- Product image require('@/assets/img/'+recipe.snapshotlist[0].s_pic) -->
                            <img class="card-img-top img-list" v-bind:src="require('@/assets/img/'+recipe.r_pic)" alt="..." />
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
<style scope>
    .card-recipe {cursor: pointer;}
</style>