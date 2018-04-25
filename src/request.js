import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://192.168.0.159:7766',
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
    wxinit: '/wechat/jsapi/'
}
