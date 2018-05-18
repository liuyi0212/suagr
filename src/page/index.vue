<template>
    <div class="main">
        <ul class="nav_list">
            <li class="nav_content" @click="jump(nav.path)" v-for="(nav,index) in navData" :key="index">
                <i :class="['icon', nav.icon]"></i>
                <span class="nav_name">{{nav.name}}</span>
            </li>
        </ul>
        <div class="answer_list">
            <dl class="answer_content" v-for="(list, index) in questionList" :key = "index" @click="jump('/interact',list.id)">
                <dt class="answer_title">{{list.title}}</dt>
                <dd class="answer_info">
                    {{list.body}}
                </dd>
                <dd class="answer_data">
                    <span class="answer_number">{{list.click}}</span>
                    <i class="icon icon_best"></i>
                    <span class="answer_number">{{list.like}}</span>
                    <i class="icon icon_read"></i>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import { request, urls } from '../request'

    export default {
        data() {
            return {
                questionList: [],
                userCoin: {},
                coinRecord: [],
                navData:[
                    {
                        name:'医患互动',
                        path:'answer',
                        icon: 'icon_message',
                    },
                    {
                        name:'糖尿病指导',
                        path:'guide',
                        icon: 'icon_guide',
                    }
                ]
            }
        },
        mounted() {
            document.title = '糖友会';
        },
        created() {
            this.getQuestionList();
        },
        methods: {
            async getQuestionList() {
                const params = {
                    page: 0
                };
                const {
                    data
                } = await request.get(urls.getQuestionList, {
                    params
                })
                if (data.code === 0) {
                    this.questionList = data.data;
                }
            },
            jump(path, id) {
                if (path === 'answer') {
                    const host = location.host;
                    window.open('http://daqiao.thedoc.cn:7766/wechat/redirect/oauth2/?url=/answer');
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
    .main {
        width: 100%;
    }
    .nav_list{
        display:flex;
        padding:16px 0 16px 15px;
        .nav_content{
            font-size: 15px;
            cursor: pointer;
            flex:1;
            margin-right: 15px;
            background: #fff;
            box-sizing: border-box;
            border: 0;
            border-radius: 4px;
            padding: 10px 0 10px 10px;
            .icon{
                width: 48px;
                height: 48px;
                border: 0;
                border-radius: 24px;
                background: #fc0;
                display: inline-block;
                float: left;
                margin-right: 12px;
            }
            .icon_guide{
                background: url('../img/message_icon.png') no-repeat center #ffa934;
                background-size: 27px;
            }
            .icon_message{
                background: url('../img/answer_icon.png') no-repeat center #34cbff;
                background-size: 27px;
            }
            .nav_name{
                float: left;
                line-height: 48px;
                color: #4a4a4a;

            }
        }
    }
    @media screen and (max-width: 320px) {
        .nav_list{
            display:flex;
            padding:16px 0 16px 15px;
            .nav_content{
                .icon{
                    width: 36px;
                    height: 36px;
                }
                .nav_name{
                    line-height: 36px;
                }
            }
        }
    }

    .answer_list{
        overflow: hidden;
        .answer_content{
            background: #fff;
            padding: 15px;
            border-bottom:0.5px solid #c9c9c0;
            border-bottom:thin solid #c9c9c0;
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
                text-align: right;
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

    }
</style>
