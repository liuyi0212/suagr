<template>
    <div class="main">
        <!-- <div class="btn-wrap">
            <button @click="ask" class="btn-save right">提交</button>
        </div> -->
        <div style="height:12px;width:100%;"></div>
        <div class="answerinfo-wrap">
            <!-- <input type="text" class="title"  placeholder="标题" v-model="title"/> -->
            <ul class="tags-choice">
                <li  v-for="(val,index) in tagslist" :key="val.name" :class="{'tags-choice-item':true,'active':val.checked}" @click="tagClick(index)">{{val.name}}</li>
            </ul>
            <textarea v-model="askinfo"
                      class="answerinfo"
                      maxlength="50"
                      placeholder="请在此留下您的问题，医生会为您解答">
            </textarea>
            <p class="info-number">{{askinfo.length}}/50</p>
        </div>
        <div class="add-photo">
            <ul>
                <li v-for="img in imgList" :key="img">
                    <img :src="img" alt="">
                </li>
                <li class="addimg-bg"><input class="edit-photo" @change="onPhotoChange" type="file"/></li>
            </ul>
        </div>
        <div class="hide-name-wrap">
            <div class="left tips">
                <p class="font-important">匿名</p>
                <p class="font-basic">匿名后，您的问题仅医生可见</p>
            </div>
            <div class="right on-off">
                <mt-switch v-model="anonymous"></mt-switch>
            </div>
        </div>
         <div class="commit-btn">
            <button @click="ask" class="commit-content">提交</button>
        </div>
        <p class="consult-history" @click="ConsultClick">咨询记录</p>
    </div>
</template>

<script>
    import { request, urls } from '../request'
    import { Toast } from 'mint-ui';

    export default {
        data() {
            return {
                askinfo: '',
                anonymous: false,
                listtag:[],
                imgList: [],
                title: '',
                tags:'',
                tagslist:[
                    {
                        name:'饮食',
                        checked:false
                    },
                    {
                        name:'运动',
                        checked:false
                    },
                    {
                        name:'药物',
                        checked:false
                    },
                    {
                        name:'自我监测',
                        checked:false
                    },
                    {
                        name:'健康教育',
                        checked:false
                    },
                ]
            }
        },
        mounted() {
            document.title = '发起提问'
            console.log(this.tagslist,'是否选中')
        },
        methods: {
            async ask() {
                if (!this.askinfo) {
                    Toast('提问内容不能为空');
                    return false;
                }
                // if (!this.title) {
                //     Toast('标题不能为空');
                //     return false;
                // }
                const { data } = await request.post(urls.ask, {
                    body: this.askinfo,
                    picture: this.imgList.join(','),
                    tag:this.tags,
                    doctorsee:anonymous
                    // title: this.title
                })
                if (data.code === 0) {
                    this.$router.push({ path: '/' });
                }
            },
            async onPhotoChange(event) {
                if (this.imgList.length > 8) {
                    Toast('最多只能上传九张图');
                }
                const formData = new FormData();
                formData.append('file', event.target.files[0])
                console.log(this.imgList.length);
                if(this.imgList.length>8){
                    return 
                }
                const { data } = await request.post(urls.addimg, formData)
                if (data.code === 0) {
                    this.imgList.push(data.data.imgUrl);
                }else{
                     Toast(data.error);
                }
            },
            ConsultClick(){
                 this.$router.push({ path: '/consulthidtory' });
            },
            tagClick(index){
                  this.tagslist.forEach((val,key)=>{
                      if(key===index){
                          if(val.checked){
                             val.checked=false
                             this.listtag.forEach((item,xb)=>{
                                 if(item===val.name){
                                    console.log(item,val.name,xb,'zhejj',this.listtag)
                                    this.listtag.splice(xb,1)
                                 }
                             })
    
                             
                          }else{
                             this.$set(this.tagslist[index],'checked',true)
                             this.listtag.push(val.name)
                          }
                           this.tags=this.listtag.join()
                           console.log(this.tags,'最后的')
                      }
                  })
            },
            commitClick(){

            }
        }
    }
</script>

<style lang="less" scoped>
    .answerinfo-wrap {
        background: #fff;
        border-bottom: 0.5px solid #e5e5e5;
        border-bottom: thin solid #e5e5e5;
        .font{
            font-size: 16px;
            line-height: 1.5;
            color: #4a4a4a;
            box-sizing: border-box;
            padding: 0 15px;
        }
        .title{
            width: 100%;
            border-bottom: 0.5px solid #e5e5e5;
            border-bottom: thin solid #e5e5e5;
            height: 48px;
            line-height: 48px;
            .font
        }
        .answerinfo {
            .font;
            box-sizing: border-box;
            width: 100%;
            height: 132px;
            resize: none;
            padding-top: 12px;
        }

        .info-number {
            text-align: right;
            font-size: 12px;
            color: #9b9b9b;
            padding: 15px 15px;
        }
        .tags-choice{
            display:flex;
            padding-left:15px;
            padding-right:15px;
            height:48px;
            justify-content: space-around;
            align-items:center;
            border-bottom:thin solid #e5e5e5;
            .tags-choice-item{
                width:17%;
                height:24px;
                line-height:24px;
                border: 1px solid #AFAFAF;
                border-radius: 4px;
                text-align:center;
                font-size: 12px;
                color: #4A4A4A;
            }
            .active{
                background: #82CEF2;
                border:none;
                height:26px;
                line-height:26px;
                font-size: 12px;
                color: #FFFFFF;
            }
        }

    }

    .add-photo {
        background: #fff;
        padding: 15.5px 0 0;
        border-bottom: 0.5px solid #e5e5e5;
        border-bottom: thin solid #e5e5e5;
        overflow: hidden;
        margin-bottom: 8px;

    ul {
        padding: 0 0 15px 15px;
        overflow: hidden;

    li {
        width: 80px;
        height: 80px;
        border: solid 0.5px #ccc;
        border: solid thin #ccc;
        display: inline-block;
        float: left;
        margin:0 8px 8px 0;

    img {
        width: 100%;
        height: 100%;
    }

    }
    .addimg-bg {
        background: url("../img/icon_add.png") no-repeat center;
        background-size: 36px;
    }

    }
    }
    .edit-photo {
        background: #f5f5f5;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .hide-name-wrap {
        height: 65px;
        background: #fff;
        padding: 0px 15px;

    .tips {
        padding: 12px 0;

    .font-basic {
        font-size: 14px;
        color: #9b9b9b;
        line-height: 1;
    }

    .font-important {
        font-weight: bold;
        font-size: 16px;
        line-height: 1;
        margin-bottom: 11px;
    }

    }
    .on-off {
        margin: 17px 0;
    }

    }
    .btn-wrap {
        padding: 8px 15px;
        overflow: hidden;

    .btn-save {
        width: 48px;
        height: 24px;
        border: 0;
        border-radius: 4px;
        background: #82cef2;
        font-size: 14px;
        color: #fff;
    }

    }
    .commit-btn{
        width:100%;
        margin-top:30px;
        text-align: center;
        .commit-content{
            width:87%;
            background: #09BB07;
            border-radius: 4px;
            font-size: 18px;
            color: #FFFFFF;
            line-height: 18px;
            height:44px;
        }
    }
    .consult-history{
        margin-top:20px;
        text-align:center;
        font-size: 12px;
        color: #4A4A4A;
        line-height: 12px;
    }
</style>
<style>
    .mint-switch-input:checked + .mint-switch-core {
        border-color: #09bb07;
        background-color: #09bb07;
    }
</style>
