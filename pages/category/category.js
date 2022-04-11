// pages/category/category.js
import { request } from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
    cates: [],

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧菜单
        menuList: [],
        // 右侧商品，
        productContent: [],
        // 被点击菜单
        currentIndex: 0,
        scollTop: 0
    },

    async getCates() {
        const res = await request({ url: '/categories' })
        this.cates = res.data.message
        wx.setStorageSync('cates', { time: Date.now(), data: this.cates })
        let menuList = this.cates.map(item => item.cat_name);
        let productContent = this.cates[0].children;
        this.setData({
            productContent,
            menuList
        })
    },

    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        let productContent = this.cates[index].children;
        this.setData({
            currentIndex: index,
            productContent,
            scollTop: 0 // 重新设置scollTop
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 性能优化
        // 接口数据大，做缓存处理
        const cates = wx.getStorageSync('cates');
        if (!cates) {
            this.getCates();
        } else {
            if (Date.now() - cates.time > 1000 * 10) {
                this.getCates();
            } else {
                this.cates = cates.data;
                let menuList = this.cates.map(item => item.cat_name);
                let productContent = this.cates[0].children;
                this.setData({
                    productContent,
                    menuList
                })
            }
        }
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})