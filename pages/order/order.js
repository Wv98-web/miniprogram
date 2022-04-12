// pages/order/order.js
import { request } from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    // query
    QueryParams: {
        query: "",
        type: 1,
        pagenum: 1,
        pagesize: 10
    },
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { id: 0, value: '全部订单', isActive: true },
            { id: 1, value: '待付款订单', isActive: false },
            { id: 2, value: '待收货订单', isActive: false },
            { id: 3, value: '退款/退货订单', isActive: false },
        ],
        orders: []
    },

    changeByIndex(index) {
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)

        this.setData({
            tabs
        })
    },

    handleTabsItemChange(e) {
        const { index } = e.detail;
        this.changeByIndex(index);
        this.getOrders(index + 1);
    },

    async getOrders(type) {
        const res = await request({
            url: "/my/orders/all",
            data: { type }
        })
        const { orders } = res.data.message;
        this.setData({
            orders: orders.map(v => ({
                ...v, create_time: (new Date(v.create_time * 1000).toLocaleString())
            }))
        });
        
        wx.stopPullDownRefresh()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // this.QueryParams.type = options.type;
        // const type = this.QueryParams.type;
        // const res = await request({
        //     url: "/my/orders/all",
        //     data: { type }
        // })
        // const { orders } = res.data.message;

        // this.setData({
        //     orders: orders.map(v => ({
        //         ...v, create_time: (new Date(v.create_time * 1000).toLocaleString())
        //     }))
        // });
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
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
            })
            return
        }

        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        const { type } = currentPage.options;
        this.changeByIndex(type - 1);
        this.getOrders(type);
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
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        const { type } = currentPage.options;
        this.changeByIndex(type - 1);
        this.getOrders(type);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})