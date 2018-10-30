<template>
    <div class="main">
        <div>
        <dl class="guide" v-for="(list,index) in questionList" @click="jump(list.url)" :key="index">
            <dt>
                <img :src="list.thumb_url" alt="提问图片">
            </dt>
            <dd>{{list.title}}</dd>
        </dl>
        </div>
    </div>
</template>

<script>
    import  axios from 'axios'
    import { request, urls } from '../request'

    export default {
        data() {
            return {
                questionList: []
            }
        },
        mounted() {
            document.title = '糖尿病指导';
        },
        created() {
            this.getQuestionList();
        },
        methods: {
            // async getQuestionList() {
            //     const total=[]
            //     const res = await request.get(urls.guide)
            //     if (res.data.code === 0) {
                     
            //     }
            // },
            async getQuestionList() {
                const total=[]
                await  axios.get('http://daqiao.thedoc.cn/wechat/batchget/material/', {
                }).then(res => {
                    var cotent =res.data.data[0].item
                    cotent.forEach(item=>{
                        const bar =item.content.news_item
                        bar.forEach(val=>{
                            total.push(val)
                        })  
                    })
                });
                this.questionList=total
            },
            jump(path) {
                window.location.href = path;
            }
        }
    }
</script>

<style lang="less" scoped>
    .main {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
    .guide{
        border-radius: 5px;
        background-color: #ffffff;
        border: solid 0.5px #cacaca;
        width: 100%;
        overflow: hidden;
        padding: 12px 10px;
        box-sizing: border-box;
        margin-bottom: 15px;
        dt{
            margin-bottom: 10px;
            img{
                display: inline-block;
                width: 100%;
                height: 178px;
            }
        }
        dd{
            font-size: 16px;
            line-height: 1.38;
            color: #4a4a4a;
        }
    }
</style>
