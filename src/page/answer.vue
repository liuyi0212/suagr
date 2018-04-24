<template>
    <div class="main">
        <div class="btn-wrap">
            <button @click="ask" class="btn-save right">提交</button>
        </div>
        <div class="answerinfo-wrap">
          <textarea v-model="askinfo"
                    class="answerinfo"
                    placeholder="请在此留下您的问题，医生会为您解答">
          </textarea>
            <p class="info-number">0/{{askinfo.length}}</p>
        </div>
        <div class="add-photo">
            <ul>
                <li v-for="(img,index) in imgList" key="index">
                    <img :src="img" alt="">
                </li>
                <li><input class="edit-photo" @change="onPhotoChange" type="file"/></li>
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
    </div>
</template>

<script>
    import { request, urls } from '../request'

    export default {
        data() {
            return {
                askinfo: '',
                anonymous: false,
                imgList: [],
                title: '',
            }
        },
        mounted() {
            document.title = '发起提问'
        },
        methods: {
            async ask() {
                const { data } = await request.post(urls.ask, {
                    body: this.askinfo,
                    picture: this.imgList.join(','),
                    title: this.title,
                    anonymous: this.anonymous ? '0' : '1'
                }, {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }})
                if (data.code === 0) {
                    window.history.go(-1);
                }
            },
            async onPhotoChange(event) {
                const formData = new FormData();
                formData.append('file', event.target.files[0])
                const { data } = await request.post(urls.addimg, formData)
                if (data.code === 0) {
                    this.imgList.push(data.data.imgUrl);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .answerinfo-wrap {
        background: #fff;
        border-bottom: 0.5px solid #e5e5e5;
        border-bottom: thin solid #e5e5e5;
        padding: 10px 15px 0;

    .answerinfo {
        box-sizing: border-box;
        width: 100%;
        height: 132px;
        font-size: 16px;
        line-height: 1.5;
        color: #4a4a4a;
        resize: none;
    }

    .info-number {
        text-align: right;
        font-size: 12px;
        color: #9b9b9b;
        padding: 15px 15px;
    }

    }

    .add-photo {
        background: #fff;
        padding: 15.5px 0 0;
        border-bottom: 0.5px solid #e5e5e5;
        border-bottom: thin solid #e5e5e5;
        overflow: hidden;
        margin-bottom: 8.5px;

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
        margin-right: 8px;
        img{
            width: 100%;
            height: 100%;
        }

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
</style>
<style>
    .mint-switch-input:checked + .mint-switch-core {
        border-color: #09bb07;
        background-color: #09bb07;
    }
</style>
