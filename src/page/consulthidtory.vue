<template>
 <div class="answer_list">
     <div v-if="historyhide">
        <dl class="answer_content" v-for="(list, index) in questionList" :key = "index" @click="jump('/interact',list.id)">
            <!-- <dt class="answer_title">{{list.title}}</dt> -->
            <div class="tags-choice">
                <div class="tags-choice-item" v-for="(val, index) in list.tags" :key = "index">{{val}}</div>
            </div>
            <dd class="answer_info">
                {{list.body}}
            </dd>
            <dd class="answer_data">
                <span>{{list.created| dateFilter}}</span>
                <span class="answer_number">{{list.like}}</span>
                <i class="icon icon_best"></i>
                <span class="answer_number">{{list.click}}</span>
                <i class="icon icon_read"></i>
            </dd>
        </dl>
    </div>
    <div v-if="!historyhide" style="padding-top:156px;">
        <div class="answer_list_nocontent">
            <img :src="nocontent" alt="" style="height:100%;">
        </div>
         <p style="font-size: 16px;color: #9B9B9B;line-height: 14px;margin-top:18px;text-align:center;">暂无记录</p>
    </div>
 </div>
</template>
<script>
import dateFilter from '../../src/filters'
import { request, urls } from '../request'
 export default {
        data() {
            return {
                 questionList: [],
                 historyhide:true,
                 nocontent:require('../../src/img/Group 3@3x.png')
            }
        },
        created() {
            this.loadMore();
        },
        methods: {
            async loadMore() {
                 const params = {
                    creater:'creater'
                };
                request.get(urls.getQuestionList, { params }).then((res)=>{
                    if (res.data.code === 0) {
                       this.questionList = res.data.data;
                       if(res.data.data.length===0){
                           this.historyhide=false
                       }
                    }
                })    
            },
            jump(path, id) {
                if (path === 'answer') {
                    window.open('http://daqiao.thedoc.cn:7766/wechat/redirect/oauth2/?url=/answer');
                }
                if (path === 'guide') {
                     this.$router.push({ path });
                }
                else {
                    const params = {
                        id
                    };
                    request.get(urls.read, { params }).then(()=>{
                        this.$router.push({
                            path,
                            query: {
                                id
                            }
                        });
                    })
                }
            }
        }
}
</script>
<style lang="less" scoped>
.answer_list{
        overflow: hidden;
        .answer_content{
            background: #fff;
            padding: 15px;
            border-bottom:0.5px solid #c9c9c0;
            border-bottom:thin solid #c9c9c0;
            .tags-choice{
                display:flex;
                .tags-choice-item{
                    background: #EDFBFF;
                    border-radius: 4px;
                    width:20%;
                    height:24px;
                    line-height:24px;
                    text-align:center;
                    font-size: 12px;
                    color: #4A4A4A;
                    margin-right:6px;
                }
            }
            .answer_title{
                color: #4a4a4a;
                font-weight: bold;
            }
            .answer_info{
                color: #9b9b9b;
                font-size: 14px;
                line-height: 18px;
                padding: 10px 0;
            }
            .answer_data{
                color: #9b9b9b;
                font-size: 12px;
                overflow:hidden;
                .answer_number,
                .icon{
                    float: right;
                }
                .icon{
                    margin:0 4px 0 16px;
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                }
                .icon_best{
                    background: url("../img/icon_praise.png") no-repeat  center;
                    background-size: 12px auto;
                }
                .icon_read{
                    background: url("../img/icon_read.png") no-repeat  center;
                    background-size: 12px auto;
                }
            }
        }
        .answer_list_nocontent{
            display:flex;
            width:103px;
            height:85px;
            justify-content:center;
            margin: 0 auto;
        }
    }
</style>