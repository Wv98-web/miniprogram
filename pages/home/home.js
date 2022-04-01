// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 存放轮播图数据
        swiperList: [],
        gridList: [],
        // 导航传递过来的参数对象
        query: {}
    },

    // 获取轮播图数据
    getSwiperList() {
        wx.request({
            url: 'https://www.escook.cn/slides',
            method: 'GET',
            success: (res) => {
                this.setData({
                    swiperList: res.data
                })
            }
        })
    },

    // 获取列表数据
    getGridList() {
        wx.request({
            url: 'https://www.escook.cn/categories',
            method: 'GET',
            success: (res) => {
                this.setData({
                    gridList: res.data
                })
            }
        })
    },

    // 跳转到massage页
    gotoMessage() {
        wx.switchTab({
            url: '/pages/message/message'
        })
    },

    // 跳转到info页
    gotoInfo() {
        wx.navigateTo({
            url: '/pages/index/index?name=wuwei&age=24'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSwiperList()
        this.getGridList()
        this.setData({
            query: options
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('触发上拉')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})