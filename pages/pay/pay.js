// pages/pay/pay.js
import { request } from '../../request/request';
import { requestPayment, showToast } from '../../utils/asyncWx'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },

    // 商品结算
    async handleOrderPay() {
        try {
            // token验证
            const token = wx.getStorageSync('token');
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/auth',
                })
                return
            }
            // 支付相关参数
            const header = { Authorization: token };
            const order_price = this.data.totalPrice;
            const consignee_addr = this.data.address.all;
            const cart = this.data.cart;
            let goods = [];
            cart.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: v.goods_price
            }))
            const orderParams = { order_price, consignee_addr, goods }
            const res = await request({ url: "/my/orders/create", method: "POST", data: orderParams, header: header });
            const { order_number } = res.data.message;
            const res2 = await request({ url: "/my/orders/req_unifiedorder", method: 'POST', data: { order_number }, header: header });
            const { pay } = res2.data.message;
            await requestPayment(pay)
            const res3 = await request({ url: "/my/orders/chkOrder", method: 'POST', data: { order_number }, header: header });
            const { message } = res3.data.message;
            await showToast({ title: '支付成功' });

            // 更新购物车，删除已成功购买商品
            let newCart = wx.getStorageSync('cart');
            newCart = newCart.filter(v => !v.checked)
            wx.setStorageSync('cart', newCart)

            wx.navigateTo({
                url: '/pages/order/order',
            })
        } catch (error) {
            await showToast({ title: '支付失败' });
            console.log(error)
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        // 获取缓存中的收货地址
        const address = wx.getStorageSync('address');
        let cart = wx.getStorageSync('cart') || [];
        cart = cart.filter(v => v.checked)

        this.setData({
            address
        })

        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num

        })
        this.setData({
            cart,
            totalPrice,
            totalNum
        });
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