<template>
    <div class="main">
        <div class="nav_search">
            <div class="search-item">
                <span class='search-item-img'><img style="width:12px;" :src="searchImg" alt=""></span>
                <input type="text" placeholder="搜索" class="search-input" style="width:90%" v-model="condition" @keyup.enter="searchClick"/>
                <span class='search-item-delte' style="margin-right:12px;height:100%;display: flex;align-items: center;" @click="Clearclick"><img :src="deleteImg" style="width:16px;"  alt=""></span>
            </div>
            <span class="search-word" @click="searchClick">搜索</span>
        </div>
        <div v-if="Contenthide">
            <ul class="nav_list" style="background-color:#ebebeb" v-if="searchhide">
                <li class="nav_content" @click="jump(nav.path)" v-for="(nav,index) in navData" :key="index">
                    <i :class="['icon', nav.icon]"></i>
                    <span class="nav_name">{{nav.name}}</span>
                </li>
            </ul>
            <div class="consult-list" v-if="searchhide"><span style="display:inline-block;margin-right:5px;background: #09BB07;width:4px;height:14px;"></span>咨询列表</div>
            <div class="answer_list">
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
        </div>
        <div class="no_search" v-if="!Contenthide">无此结果，请换个关键词试试</div>
    </div>
</template>

<script>
    import dateFilter from '../../src/filters'
    import { request, urls } from '../request'
    export default {
        data() {
            return {
                Contenthide:true,
                searchhide:true,
                searchImg:require('../../src/img/icon_sousuo@3x.png'),
                deleteImg:require('../../src/img/Group 2@3x.png'),
                wrapperHeight: 0,
                condition:'',
                loading: false,
                page: 0,
                hasNext: true,
                questionList: [],
                taglist:[],
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
            this.loadMore();
        },
        methods: {
            async loadMore() {
                // const params = {
                //     page: this.page
                // };
                const {
                    data
                } = await request.get(urls.getQuestionList)
                if (data.code === 0) {
                    this.questionList = data.data;
                }
                
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

            },
            Clearclick(){
                this.condition=''
                this.searchhide=true
                const params = {
                    condition:this.condition
                };
                request.get(urls.getQuestionList, { params }).then((res)=>{
                    if (res.data.code === 0) {
                       this.questionList = res.data.data;
                       this.Contenthide=true
                    }
                })
            },
            searchClick(){
                this.searchhide=false
                const params = {
                    condition:this.condition
                };
                request.get(urls.getQuestionList, { params }).then((res)=>{
                    if (res.data.code === 0) {
                       this.questionList = res.data.data;
                       if(res.data.data.length===0){
                           this.Contenthide=false
                       }
                    }
                })
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
        }

    }
    .nav_search{
        height:44px;
        padding-left:15px;
        display:flex;
        justify-content: space-between;
        align-items:center;
        padding-right:15px;
        background-color: #f5f5f5;
        .search-item{
            height:24px;
            background-color:#fff;
            border-radius: 100px;
            flex:1;
            padding-left:10px;
            display: flex;
            align-items: center;
            .search-item-img{
                display:inline-block;
                margin-right:6px;
            }
        }
        .search-word{
            font-size: 16px;
            color: #09BB07;
            line-height: 16px;
            display:block;
            margin-left:15px;
        }
    }
    .consult-list{
        background: #F5F5F5;
        height:32px;
        width:100%;
        display:flex;
        align-items:center;
        padding-left:15px;
        font-size: 14px;
        color: #4A4A4A;
        line-height: 14px;
    }
    .no_search{
        font-size: 16px;
        color: #4A4A4A;
        line-height: 16px;
        padding-left:15px;
    }
</style>
