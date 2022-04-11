// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx';
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    // 收货地址选择
    async handleChooseAddress() {
        // wx.getSetting({
        //     success: (result) => {
        //         const scopeAddress = result.authSetting["scope.address"]
        //         if (scopeAddress === true || scopeAddress === undefined) {
        //             wx.chooseAddress({
        //                 success: (result1) => { console.log(result1) },
        //             })
        //         } else {
        //             wx.openSetting({
        //                 success: ((result2) => {
        //                     wx.chooseAddress({
        //                         success: (result3) => { console.log(result3) },
        //                     })
        //                 })
        //             })
        //         }
        //     }
        // })

        try {
            // 获取权限状态
            const res1 = await getSetting();
            // scope.address !!! 已取消授权，可以直接使用 wx.chooseAddress
            const scopeAddress = res1.authSetting["scope.address"];
            // 判断权限状态
            if (scopeAddress === false) {
                await openSetting()
            }
            // 获取收获地址
            let address = await chooseAddress();
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
            wx.setStorageSync('address', address)
        } catch (error) {
            console.log(error)
        }
    },

    // 购物车状态封装
    setCart(cart) {
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num
            } else {
                allChecked = false
            }
        })
        allChecked = cart.length != 0 ? allChecked : false;
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        });
        wx.setStorageSync('cart', cart);
    },

    // 商品单选
    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id;
        let { cart } = this.data;
        let index = cart.findIndex(v => v.goods_id === goods_id);
        cart[index].checked = !cart[index].checked;

        this.setCart(cart)
    },

    // 商品全选
    handleAllChange() {
        let { cart, allChecked } = this.data;
        allChecked = !allChecked;
        cart.forEach(v => v.checked = allChecked);

        this.setCart(cart);
    },

    // 商品数量
    async handleItemNumEdit(e) {
        const { id, operation } = e.currentTarget.dataset;
        let { cart } = this.data;
        const index = cart.findIndex(v => v.goods_id === id);

        if (cart[index].num === 1 && operation === -1) {
            // wx.showModal({
            //     title: '提示',
            //     content: '是否要删除商品?',
            //     success: (res) => {
            //         if (res.confirm) {
            //             cart.splice(index, 1)
            //             this.setCart(cart);
            //         } else if (res.cancel) {
            //             console.log('用户点击取消')
            //         }
            //     }
            // })

            // 代码promise化
            const res = await showModal({ content: '是否要删除商品' });
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart);
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        } else {
            cart[index].num += operation;
            this.setCart(cart)
        }
    },

    // 商品结算
    handlePay() {
        const { address, totalNum } = this.data;
        if (!address.userName) {
            showToast({ title: '缺少收获信息' });
            return;
        }

        if (totalNum === 0) {
            showToast({ title: '你还没有选购商品' });
            return;
        }

        wx.navigateTo({
            url: '/pages/pay/pay',
        })
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
        const cart = wx.getStorageSync('cart') || [];

        this.setData({
            address
        })
        this.setCart(cart)
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