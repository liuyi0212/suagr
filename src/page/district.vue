<template>
<div class="district">
    <ul>
        <li v-for="item in list" :key="item" class="district-item" @click="choicedistrict(item)">{{ item }}</li>
    </ul>
</div>
</template>
<script>
export default{
   data(){
       return {
           loading:false,
           list:['长眉','长阳','中王','方子','申新','河间','广航苑','新华','渭南','平眉','永安','杨家宅','福禄里','鸿德坊','约坊','华忻坊','临青','锦州','银河苑','周家牌','宁国','杭州','顺成里','引翔港','双阳','幸福村','富天苑','宁武','仁兴街']
       }
   },
   methods:{
        mounted() {
            document.title = '所属区委';
        },
       choicedistrict(val){
           console.log(val)
            this.$router.push({
                name: 'basicInfo',
                query:{
                  val:val
                }
            })
       }
   }

}
</script>
<style lang="less" scoped>
.district{
     background:#fff;
     .district-item{
         height:47px;
         line-height:47px;
         border-bottom:1px solid #F5F5F5;
         font-size: 16px;
         color: #4A4A4A;
         padding-left:15px;
     }
}
   
</style>