// pages/goods_detail/goods_detail.js
import { request } from '../../request/request'

Page({
    GoodsInfo: {},

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },

    async getGoodsDetail(goods_id) {
        const res = await request({
            url: '/goods/detail',
            data: { goods_id }
        })
        this.GoodsInfo = res.data.message
        this.setData({
            goodsObj: {
                goods_name: res.data.message.goods_name,
                goods_price: res.data.message.goods_price,
                // ipone部分机型不支持webp图片格式
                // webp格式临时修改 webp => jpg
                goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: res.data.message.pics
            }
        })
    },

    // 点击轮播图预览
    handlePreviewImage(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            urls,
            current
        })
    },

    handleAddToCart() {
        let cart = wx.getStorageSync('cart') || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo)
        } else {
            cart[index].num++;
        }

        wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { goods_id } = options;
        this.getGoodsDetail(goods_id)
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