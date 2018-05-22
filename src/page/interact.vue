<template>
    <div class="main">
        <div class="question-wrap">
            <h6 class="question-title">{{articleData.title}} <span class="question-num">阅读 {{articleData.click}}</span></h6>
            <section class="question-info">{{articleData.body}}</section>
            <ul class="question-img-list">
                <li  v-for="(photo,index) in articleData.pictureset">
                    <img :src="photo" alt="" @click="blowup(photo)">
                </li>
            </ul>
        </div>
        <dl class="answer-wrap" v-show="articleData.replycontent">
            <dt class="answer-title">
                <img  class="answer-portrait" :src="articleData.answerportrait" alt="">
                <i class="icon icon_photo"></i>
                大桥卫生服务中心</dt>
            <dd class="answer-info">{{articleData.replycontent}}</dd>
        </dl>
        <div>
            <ul class="user-edit">
                <li :class="['edit-icon','praise', { bg_gray: isPraise }]" @click="praise()">
                    {{isPraise ? '已赞':'点赞'}}
                </li>
                <li :class="['edit-icon', 'share']" @click="clickShare()">
                    分享
                </li>
            </ul>
        </div>
        <mt-popup class="interact"
                v-model="popupVisible">
            <img :src="blowupImg" alt="">
        </mt-popup>
        <mt-popup class="share"
                v-model="isShare">
            <img :src="shareImg" alt="">
        </mt-popup>
    </div>
</template>

<script>
    import wxinit from '../wxinit';
    import shareConfig from '../wxshare';
    import { request, urls } from '../request';


    export default {
        data() {
            return {
                articleData: {},
                isPraise: false,
                id: this.$route.query.id,
                popupVisible: false,
                blowupImg: '',
                isShare: false,
                shareImg: require('../img/sharetips.png')
            }
        },
        mounted() {
            document.title = '医患互动';
            setTimeout(() => {
                window.addEventListener('popstate', () => {
                    wxinit();
                    const wx = window.wx;
                    wx.ready(() => {
                        wx.hideAllNonBaseMenuItem();
                    });
                });
            }, 500);
        },
        created() {
            this.getArticle();
        },
        methods: {
            blowup(imgUrl, share){
                this.blowupImg = imgUrl;
                this.popupVisible = true;
            },
            clickShare() {
                this.isShare = true;
            },
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
                shareConfig.config({
                    title: this.articleData.title,
                    imgUrl: 'https://upyun.thedoc.cn/img/4079ec97-b990-4e6c-a417-31c0f129b46f.png',
                    desc: this.articleData.body.substring(0,20)
                });
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
            }
        }
    }
</script>
<style lang="less">
    .interact{
        &.mint-popup{
            width: 90%;
            background: none;
            img{
                width: 100%;
            }
        }
    }
    .share{
        &.mint-popup{
            width: 90%;
            background: none;
            top:30%;
            img{
                width: 100%;
            }
        }
    }
</style>
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
        min-height: 24px;
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
                height: 100%;
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
        .icon{
            width: 30px;
            height: 30px;
            display: inline-block;
        }
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
            padding-top: 32px;
            box-sizing: border-box;
        }
        .praise{
            background: url('../img/praise_icon.png') no-repeat top 10px center #f9b93a;
            background-size: 20px;
        }
        .share{
            background: url('../img/share_icon.png') no-repeat top 10px center #34cbff;
            background-size: 20px;
        }
        .bg_gray {
            background-color: #d1d1d1;
        }
    }
</style>
