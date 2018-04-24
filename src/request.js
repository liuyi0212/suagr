import axios from 'axios';
// import queryString from 'query-string'

export const request = axios.create({
    baseURL: 'http://192.168.0.130:7766',
    timeout: 30000
    // transformRequest: [data => {
    //     if (data instanceof FormData) {
    //         return data
    //     }
    //     return queryString.stringify(data)
    // }]
})

export const urls = {
    getArticle: '/get/article/',
    reply: '/reply/article/',
    ask: '/submit/article/',
    addimg: '/upload/img/',
    praise: '/like/article/',
    getFodder: '/get/permanent/footage/',
    getQuestionList: '/search/article/',
    MemberInfo: '/insert/member/info/'
}
