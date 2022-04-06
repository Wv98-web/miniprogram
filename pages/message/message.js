// pages/message/message.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "zhangsan",
        username2: "WUWEI",
        count: 0
    },

    syncCount(e) {
        this.setData({
            count: e.detail.value
        })
    },

    getChild() {
        const child = this.selectComponent(".customA")
        child.addCount()
    },

    async getInfo() {
        const { data: res } = await wx.p.request({
            methods: 'GET',
            url: 'https://www.escook.cn/api/get',
            data: { name: 'wuwei', age: 24 }
        })
    },

    btnHandler1(e) {
        this.updateNum1(e.target.dataset.step)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['num1', 'num2', 'sum'],
            actions: ['updateNum1']
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
        this.storeBindings.destroyStoreBindings()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log('触发下拉')
        wx.stopPullDownRefresh()
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