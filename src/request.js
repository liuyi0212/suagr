import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://120.26.116.47:7766/',
    timeout: 30000
})

export const urls = {
    getArticle: '/get/article/',
    isImpower:'/wechat/redirect/oauth2/?url=/answer',
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
