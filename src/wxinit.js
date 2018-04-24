import $http from 'axios';

export default apis => {
    const wx = window.wx;
    $http.get('', { params: { url: window.location.href.split('#')[0] } }).then(data => {
        const params = {
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'chooseImage', 'uploadImage', 'chooseWXPay', ...(apis || [])]
        };
        wx.config(params);
    });
};
