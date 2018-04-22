<template>
    <div class="main">
        <div class="question-wrap">
            <h6 class="question-title">{{articleData.title}} <span class="question-num">阅读 {{articleData.read}}</span></h6>
            <section class="question-info">{{articleData.body}}</section>
            <ul class="question-img-list">
                <li  v-for="(photo,index) in articleData.pictureset">
                    <img :src="photo" alt="">
                </li>
            </ul>
        </div>
        <dl class="answer-wrap">
            <dt class="answer-title">
                <img  class="answer-portrait" :src="articleData.answerportrait" alt="">
                <i class="icon icon_photo"></i>
                大桥卫生服务中心</dt>
            <dd class="answer-info">{{articleData.replycontent}}</dd>
        </dl>
        <div>
            <ul class="user-edit">
                <li :class="['edit-icon',{ bg_gray: isPraise }]" @click="praise()">
                    <i class="icon icon-praise"></i>
                    点赞
                </li>
                <li class="edit-icon" @click="share()">
                    <i class="icon icon-share"></i>
                    分享
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import { request, urls } from '../request';

    export default {
        data() {
            return {
                articleData: {},
                isPraise: false,
                id: this.$route.query.id
            }
        },
        mounted() {
            document.title = '医患互动';
            // wx.config({
            //
            // })
            // wx.ready(() => {
            //     // wx.
            // })
        },
        created() {
            this.getArticle();
        },
        methods: {
            async getArticle() {
                const params = {
                    id: this.id
                };
                const {
                    data
                } = await request.get(urls.getArticle, {
                    params
                })
                if (data.code === 0) {
                    this.articleData = data.data;
                }
            },
            async praise() {
                if(this.isPraise){
                    return false;
                }
                const params = {
                    id: this.id
                };
                const {
                    data
                } = await request.get(urls.praise, {
                    params
                })
                if (data.code === 0) {
                    this.isPraise = true;
                    console.log(this.isPraise);
                }
            },
            async share() {
                alert(' /*调取微信分享接口*/')
            }
        }
    }
</script>

<style lang="less" scoped>
    .question-wrap {
        background: #fff;
        overflow: hidden;
        margin-bottom: 8px;

    .question-title {
        border-bottom: 0.5px solid #f5f5f5;
        border-bottom: thin solid #f5f5f5;
        padding: 16px 15px;
        font-size: 16px;
        line-height: 24px;
        color: #4a4a4a;
        font-weight: bold;

    .question-num {
        font-size: 12px;
        color: #9b9b9b;
        float: right;
        font-weight: normal;
    }

    }
    .question-info {
        font-size: 16px;
        line-height: 1.5;
        color: #4a4a4a;
        padding: 12px 15px;
    }

    .question-img-list {
        padding: 0 0 6px 15px;
        overflow: hidden;

        li {
            width: 80px;
            height: 80px;
            float: left;
            background: #d8d8d8;
            margin: 8px 8px 8px 0;
            img{
                width:100%;
            }
        }

    }
    }
    .answer-wrap {
        background: #fff;
        overflow: hidden;
        padding: 0 15px 15px;

    .answer-title {
        height: 48px;
        line-height: 48px;
        border-bottom: 0.5px solid #c9c9c9;
        border-bottom: thin solid #c9c9c9;
        font-size: 16px;
        color: #4a4a4a;
        .answer-portrait{
            width: 32px;
            height: 32px;
            display: inline-block;
            border: 0;
            border-radius: 16px;
            background: #d8d8d8;
            float: left;
            margin: 8px 10px 8px 0;
         }
    }
    .answer-info {
        font-size: 14px;
        padding: 10px 0;
        color: #9b9b9b;
        line-height: 1.5;
    }

    }
    .user-edit {
        text-align: center;
        width: 100%;
        .edit-icon {
            display: inline-block;
            width: 56px;
            height: 56px;
            border: 0;
            border-radius: 28px;
            text-align: center;
            color: #fff;
            margin: 18px;
            font-size: 12px;
            background-color: #f9b93a;
        }
        .praise-icon{
            background-color: #f9b93a;
        }
        .share-icon{
            background-color: #34cbff;
        }
        .bg_gray {
            background: #d1d1d1;
        }
    }
</style>
