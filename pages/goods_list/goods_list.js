import { request } from "../../request/request";

// pages/goods_list/goods_list.js
Page({
    // query
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1,
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { id: 0, value: '综合', isActive: true },
            { id: 0, value: '销量', isActive: false },
            { id: 0, value: '价格', isActive: false },
        ],
        goodsList: []
    },

    // 标题点击事件
    handleTabsItemChange(e) {
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)

        this.setData({
            tabs
        })
    },

    // 获取列表数据
    async getGoodsList() {
        const res = await request({
            url: "/goods/search",
            data: this.QueryParams
        })
        const total = res.data.message.total;
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.data.message.goods]
        })
        wx.stopPullDownRefresh()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid
        this.getGoodsList()
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
        this.QueryParams.pagenum = 1;
        this.setData({
            goodsList: []
        })
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一页数据了',
            })
        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})