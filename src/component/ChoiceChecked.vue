<template>
    <div class="checkbutton">
        <div class="checked-active-item"><span :class="{'checked-disable':true,'active':activeVal}" @click="choice(1)"></span>是</div>
        <div class="checked-active-item disable"><span :class="{'checked-disable':true,'active':!activeVal}" @click="choice(0)"></span>否</div>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
  .checkbutton{
      display:flex;
      align-items:center;
      height:100%;
      justify-content:flex-end;
      .disable{
          margin-right:0px !important;
      }
      .checked-active-item{
          margin-right:22px;
          display:flex;
          .checked-disable{
              display:block;
              width:20px;
              height:20px;
              margin-right:6px;
              background: url("../img/disblechoice@3x.png") no-repeat  center;
              background-size: 20px auto;
          }
         .active{
              background: url("../img/Group2@3x.png") no-repeat  center;
              background-size: 20px auto;
          }
      }
  }
</style>
<script>
export default {
    props: ['active','type'],
    computed:{
        activeVal(){
            console.log(this.active,'接受的变化')
            if(this.active!==0){
                 return true
            }else{
                return false
            }
        }
    },
    data() {
        return {
        }
    },
    methods:{
        choice(val){
            this.$emit("choice",val,this.type)
        }
    }
}
</script>