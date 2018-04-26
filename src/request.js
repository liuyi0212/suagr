import axios from 'axios';

export const request = axios.create({
    timeout: 30000
})

export const urls = {
    getArticle: '/get/article/',
    reply: '/reply/article/',
    ask: '/submit/article/',
    addimg: '/upload/img/',
    praise: '/like/article/',
    getFodder: '/get/permanent/footage/',
    getQuestionList: '/search/article/',
    MemberInfo: '/insert/member/info/',
    wxinit: '/wechat/jsapi/',
    guide:'/wechat/batchget/material/'
}
