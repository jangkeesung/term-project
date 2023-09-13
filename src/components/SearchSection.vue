<template lang="">
        <!-- Section-->
        <section class="py-5" v-if="recipes">
            <div class="container px-4 px-lg-5 mt-2">
                <h1 class="pb-5 all-h1">&lt; {{s_category}} 레시피 &gt;</h1>
                <div class="navbar navbar-light bg-light mb-2">
                    <div class="container-fluid">
                        <div class="navbar-brand">레시피 검색
                            <!-- <span class="fw-bolder r_category px-3 py-1 ms-2">{{s_category}}</span> -->
                        </div>
                        <form class="d-flex" v-on:submit.prevent="search">
                            <select class="form-select me-2 w-50" aria-label="Default select example" v-model="s_col" required>
                                <option value="" disabled>검색 분류</option>
                                <option value="r_subject">제목</option>
                                <option value="r_writer">작성자</option>
                            </select>
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="s_word" required ref="input">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>

                <h5 class="my-4" v-if="p_word != '' && recipes.length > 0"> {{v_col}}: '{{p_word}}'(으)로 검색한 결과</h5>
                <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center" v-if="recipes.length > 0">
                    <div class="col mb-5" v-for="(recipe, index) in recipes" key="recipe">
                        <div class="card h-100 card-recipe" @click="this.linkView(recipe.r_seq)">
                            <!-- Product image require('@/assets/img/'+recipe.snapshotlist[0].s_pic) -->
                            <img class="card-img-top img-list" v-bind:src="require('@/assets/img/snapshot/'+recipe.r_pic)" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <span class="fw-bolder r_category px-3 py-1">{{recipe.r_category}}</span>
                                    <h5 class="fw-bolder r_subject mt-3">{{parsedSubject(recipe.r_subject)}}</h5>
                                </div>
                                <span class="d-flex justify-content-around row"><span class="r_writer">👩‍🍳{{recipe.r_writer}}</span><span class="r_regdate">{{recipe.r_regdate.substr(0,10)}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="mt-5 norecipe" v-else>{{v_col}}: '{{ p_word }}'(으)로 조회된 검색 결과가 없습니다.</h3>
            </div>
        </section>
</template>
<script>
import axios from 'axios';
export default {
    props: ['recipes', 'p_col', 'p_word','p_category', 'isLoading'],
    methods: {
        linkView(seq) {
            // this.$store.state.r_seq = recipe.r_seq;
            this.$router.push({name: 'recipe', query: { seq }});
        },
        search() {
            if (this.s_word.trim() == '') {
                //공백 입력 시 버튼 무효화
                return false;
            }
            // console.log(this.s_col, this.s_word);
            // this.$store.commit('setColWord', {s_col:this.s_col, s_word:this.s_word});
            this.$emit('gosearch', this.s_col, this.s_word.trim());
            this.$refs.input.blur();
        },
        parsedSubject(subject) {
            const maxLength = 20;
            return subject.length > maxLength
                ? subject.slice(0, maxLength) + "..."
                : subject;
        }
    },
    watch: {
        p_category() {
            this.s_col = "r_subject";
            this.s_word = "";
        },
        p_word() {
            this.s_word = this.p_word;
        }
    },
    computed: {
        v_col() {
            switch(this.p_col) {
                case 'r_subject':
                    return '제목';
                case 'r_writer':
                    return '작성자';
                default:
                    return '';
            }
        },
        s_category() {
            if (this.p_category == 0 || this.p_category == undefined) {
                return '전체';
            }
            const foundCategory = this.categorylist.find(item => this.p_category == item.seq);
            if (foundCategory && foundCategory.name) {
                return foundCategory.name;
            }
        }
    },
    data() {
        return {
            s_col:"r_subject",
            s_word:"",
            categorylist: []
        }
    },
    created() {
        // console.log(this.p_col, this.p_word);
        if (this.p_col !== undefined  && this.p_word !== undefined) {
            this.s_col = this.p_col;
            this.s_word = this.p_word;
        }

        axios.get("/term/get-category")
        .then((response)=>{
            response.data.forEach((item, index)=>{
                this.categorylist.push({seq: item.ct_seq, name: item.ct_name});
            });
        });
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
    .norecipe {
        padding-top: 2rem;
        height: 250px;
    }
</style>