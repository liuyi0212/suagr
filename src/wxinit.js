import {request,urls} from './request';

export default apis => {
    const wx = window.wx;
    request.get(urls.wxinit, { params: { url: window.location.href.split('#')[0] } }).then(data => {
        const params = {
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'hideAllNonBaseMenuItem',
                'onMenuShareAppMessage',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        };
        wx.config(params);
    });
};
