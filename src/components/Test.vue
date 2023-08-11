<template lang="">
    <div>
        
    </div>
</template>
<script>
import axios from 'axios';

export default {
    async created() {
        //post의 두번째 매개변수는 json이고 body이다. 그래서 스프링 컨트롤러에서 @RequestBody로 받아야 한다.
        await axios.post('/term/axiostest',{id: 'test입니다.', pw:'1234'})
                .then((response)=>{console.log(response.data)});
    }
}
</script>
<style lang="">
    
</style>