<template lang="">
        <!-- Section-->
        <section class="py-5" v-if="recipes">
            <div class="container px-4 px-lg-5 mt-5">
                <h1 class="pb-5 all-h1" v-if="my === undefined">&lt; 모든 레시피 &gt;</h1>
                <h1 class="pb-5 all-h1" v-if="my && recipes.length > 0">&lt; 내 레시피 &gt;</h1>
                <div class="navbar navbar-light bg-light mb-2" v-if="my === undefined">
                    <div class="container-fluid">
                        <a class="navbar-brand">레시피 검색</a>
                        <form class="d-flex" v-on:submit.prevent="search">
                            <select class="form-select me-2 w-50" aria-label="Default select example" v-model="s_col" required>
                                <option value="" disabled>검색 분류</option>
                                <option value="r_subject">제목</option>
                                <option value="r_writer">작성자</option>
                            </select>
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="s_word" required>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center" v-if="recipes.length > 0">
                    <div class="col mb-5" v-for="(recipe, index) in recipes" key="recipe">
                        <div class="card h-100 card-recipe" @click="this.linkView(recipe.r_seq)">
                            <!-- Product image require('@/assets/img/'+recipe.snapshotlist[0].s_pic) -->
                            <img class="card-img-top img-list" v-bind:src="require('@/assets/img/snapshot/'+recipe.r_pic)" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <span class="fw-bolder r_category px-3 py-1">{{recipe.r_category}}</span>
                                    <h5 class="fw-bolder r_subject mt-3">{{recipe.r_subject}}</h5>
                                </div>
                                <span class="d-flex justify-content-around row"><span class="r_writer">👩‍🍳{{recipe.r_writer}}</span><span class="r_regdate">{{recipe.r_regdate.substr(0,10)}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>
<script>
export default {
    props: ['recipes', 'p_col', 'p_word', 'my'],
    methods: {
        linkView(seq) {
            // this.$store.state.r_seq = recipe.r_seq;
            this.$router.push({name: 'recipe', query: { seq }});
        },
        search() {
            // this.$router.push({name: 'search', query: { s_category: 0, s_col: this.s_col, s_word: this.s_word }});
            // this.$router.push('/search?s_col='+this.s_col+'&s_word='+this.s_word);
            if (this.s_word.trim() == '') {
                //공백 입력 시 버튼 무효화
                return false;
            }
            this.$store.commit('setColWord', {s_col:this.s_col, s_word:this.s_word});
            this.$router.push('/search?category=0');
        }
    },
    data() {
        return {
            s_col:"r_subject",
            s_word:""
        }
    },
    created() {
        // console.log(this.p_col, this.p_word);
        if (this.p_col !== undefined  && this.p_word !== undefined) {
            this.s_col = this.p_col;
            this.s_word = this.p_word;
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
    }
    .all-h1 {
        font-family: 'BMHANNAPro';
    }
    .r_category {
        background-color: #DDD;
        border-radius: 15px;
    }
    .r_regdate {
        /* background-color: #CFF7AC; */
        color: #AAA;
    }
</style>