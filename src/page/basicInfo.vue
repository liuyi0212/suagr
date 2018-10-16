<template>
    <div class="main">
        <p class="default-font">补充基本信息，即可向医生发起提问</p>
        <div class="basic-wrap">
            <div class="input-wrap">
                <p class="input-label">姓名</p>
                <input type="text" class="from-control" v-model="realname" placeholder="填写姓名"/>
            </div>
            <div class="input-wrap">
                <p class="input-label">性别</p>
                <button @click="selectGender" class="from-control" :style="{'color': colorchagetwo,height:'100%'}">{{gender}}</button>
            </div>
            <div class="input-wrap">
                <p class="input-label">年龄</p>
                <input type="number" class="from-control"  v-model="age" placeholder="请输入"/>
            </div>
            <div class="input-wrap">
                <p class="input-label">糖尿病</p>
                <choice-checked :active="choiceitem" :type="'tang'" @choice="choice"></choice-checked>  
            </div>
             <div class="input-wrap">
                <p class="input-label">高血压</p>
                <choice-checked :active="gaoitem" :type="'gao'" @choice="choice"></choice-checked>  
            </div>
              <div class="input-wrap" style="display:flex">
                <p class="input-label" style="flex:1;">所属区委</p>
                <div class="from-control" style='display: flex;
    align-items:center;width:60%;justify-content:flex-end' @click='choicedistrict'>
                     <p :style="{'color': colorchage}">{{country}}</p>
                    <p style="height:100%;color:#9b9b9b;margin-left:7px">></p>
                </div>
            </div>
            <button class="btn-save" @click="saveMemberInfo">保存</button>
        </div>
        <select-box :show="popupVisible" @selectSex="selectSex" @hide="popupVisible = false"></select-box>
    </div>
</template>
<script>
    import moment from 'moment';
    import { request, urls } from '../request'
    import axios from 'axios';
    import { Toast,Radio } from 'mint-ui';
    import SelectBox from '../component/SelectBox';
    import ChoiceChecked from "../component/ChoiceChecked";
    export default {
        data() {
            return {
                popupVisible: false,
                age: '',
                gender: '请选择',
                realname: '',
                country:'请选择',
                colorchage:'#9b9b9b',
                colorchagetwo:'#9b9b9b',
                ajaxdata: {},
                choiceitem:1,
                gaoitem:0
            }
        },
        components: {
            SelectBox,
            ChoiceChecked
        },
        mounted() {
            document.title = '基本信息';
            if(this.$route.query.val){
                this.country=this.$route.query.val
                this.colorchage='#4a4a4a'
            }else{
                this.country='请选择'
                this.colorchage='#9b9b9b'
            } 
        },
        methods: {
            selectSex(value){
              this.gender = value;
              this.colorchagetwo='#4a4a4a'
            },
            selectGender() {
                this.popupVisible = true;
            },
            async saveMemberInfo() {
                const { data } = await request.post(urls.MemberInfo, {
                    age: this.age,
                    gender: this.gender,
                    realname: this.realname,
                    diabetes:this.choiceitem,
                    hypertension:this.gaoitem,
                    district:this.country
                })
                if (data.code === 0) {
                     Toast({
                            message: '保存信息成功',
                            position: 'bottom',
                            duration: 5000
                    });
                    setTimeout(() => this.$router.push({ path: '/answer' }), 1000) 
                }
            },
            choice(val,type){
                if(type=='tang'){
                    this.choiceitem=val
                }else{
                    this.gaoitem=val
                }
            },
            choicedistrict(){
                  this.$router.push({ path: '/district'});
            }
        }
    }
</script>
<style lang="less">
    .picker-item{
        text-align: center;
    }
    .picker-toolbar{
        height: 44px;
        background: #f5f5f5;
        padding: 0 16px;
    }
    .mint-datetime-cancel{
        text-align: left;
        color: #9b9b9b;
    }
    .mint-datetime-confirm{
        text-align: right;
        color: #4a4a4a;
    }
</style>
<style lang="less" scoped>
    .main {
        width: 100%;
        background: #fff;
        height: 100%;
    }
    .default-font{
        text-align: center;
        font-size: 18px;
        color: #4a4a4a;
        border-bottom: 1px solid #f5f5f5;
        padding: 30px 0;
    }
    .basic-wrap{
        padding: 30px 44px 0;
    }
    .btn-save{
        margin: 14px 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 18px;
        text-align: center;
        border-radius: 4px;
        background-color: #1aad19;
        color: #fff;
        cursor: pointer;
    }
    .input-wrap{
        width: 100%;
        box-sizing:border-box;
        border-radius: 4px;
        background-color: #f5f5f5;
        border: solid 1px #d1d1d1;
        height: 44px;
        margin-bottom: 16px;
        padding: 0 36px 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .input-label{
            line-height: 42px;
            font-size: 16px;
            color: #4a4a4a;
        }
        .from-control{
            text-align: right;
            padding: 12px 0;
            height: 18px;
            font-size: 16px;
            width:80%;
        }
        .input-none{
            pointer-events: none;
        }
    }
</style>
