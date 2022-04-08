// pages/home/home.js
import { request } from '../../request/request'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 存放轮播图数据
        swiperList: [],
        // 导航
        catesList: [],
        // 
        floorList: [],
        // 导航传递过来的参数对象
        query: {}
    },

    // 获取轮播图数据
    getSwiperList() {
        // api promise化
        request({ url: 'home/swiperdata', method: 'GET' }).then(res => {
            this.setData({
                swiperList: res.data.message
            })
        })
    },

    // 获取分类导航数据
    getCatesList() {
        request({ url: 'home/catitems' }).then(res => {
            this.setData({
                catesList: res.data.message
            })
        })
    },

    getFloorList() {
        request({ url: 'home/floordata' }).then(res => {
            this.setData({
                floorList: res.data.message
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSwiperList()
        this.getCatesList()
        this.getFloorList()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})