<template>
    <div class="main">
        <dl  class="guide">
            <dt>
                <img src="" alt="提问图片">
            </dt>
            <dd>标题</dd>
        </dl>
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
            document.title = '糖尿病指导';
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
                this.$router.push({
                    path,
                    query: {
                        id
                    }
                });
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
