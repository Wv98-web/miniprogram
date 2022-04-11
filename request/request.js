let ajaxTimes = 0;
export const request = (params) => {
    // 给需要token接口 加上header Authorization
    let header = {...params.header};
    if(params.url.includes("/my/")){
        header["Authorization"] = wx.getStorageSync('token');
    }
    ajaxTimes++;

    wx.showLoading({
        title: '加载中。。。',
        mask: true
    })

    // 公共url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 300)
                }
            }
        })
    })
}