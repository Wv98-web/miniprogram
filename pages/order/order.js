// pages/order/order.js
import { request } from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { formatTime } from '../../utils/util'

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
            { id: 1, value: '全部订单', isActive: true },
            { id: 2, value: '待付款订单', isActive: false },
            { id: 3, value: '待收货订单', isActive: false },
            { id: 4, value: '退款/退货订单', isActive: false },
        ],
        orders: []
    },

    handleTabsItemChange(e) {
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)

        this.setData({
            tabs
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.QueryParams.type = options.type;
        const type = this.QueryParams.type;
        const res = await request({
            url: "/my/orders/all",
            data: { type }
        })
        const { orders } = res.data.message;

        this.setData({
            orders: orders.map(v=>({
                ...v,create_time: (new Date(v.create_time*1000).toLocaleString())
            }))
        });
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