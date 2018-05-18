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
                <input type="" @click="selectGender" class="from-control" v-model="gender" placeholder="请选择"/>
            </div>
            <div class="input-wrap">
                <p class="input-label">年龄</p>
                <input type="number" class="from-control"  v-model="age" placeholder="请输入"/>
            </div>
            <button class="btn-save" @click="saveMemberInfo">保存</button>
        </div>
        <select-box :show="popupVisible" @selectSex="selectSex" @hide="popupVisible = false"></select-box>
    </div>
</template>

<script>
    import moment from 'moment';
    import { request, urls } from '../request'
    import { Toast } from 'mint-ui';
    import SelectBox from '../component/SelectBox';
import { setTimeout } from 'timers';

    export default {
        data() {
            return {
                popupVisible: false,
                age: '',
                gender: '',
                realname: '',
                ajaxdata: {}
            }
        },
        components: {
            SelectBox
        },
        mounted() {
            document.title = '基本信息';
        },
        methods: {
            selectSex(value){
              this.gender = value;
            },
            selectGender() {
                this.popupVisible = true;
            },
            async saveMemberInfo() {
                const params = {
                    age: this.age,
                    gender: this.gender,
                    realname: this.realname
                };
                const {
                    data
                } = await request.post(urls.MemberInfo,
                    params
                )
                if (data.code) {
                    Toast({
                        message: '保存信息成功',
                        position: 'bottom',
                        duration: 5000
                    });
                    setTimeout(() => this.$router.push({ path:'/answer'}),1000)
                }
            
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
        .input-label{
            float: left;
            line-height: 44px;
            font-size: 16px;
            color: #4a4a4a;
        }
        .from-control{
            float: right;
            text-align: right;
            line-height: 44px;
            font-size: 16px;
        }
    }
</style>
