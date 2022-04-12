// pages/feedback/feedback.js
import { request } from '../../request/request';
import regeneratorRuntime from '../../lib/runtime/runtime';
import { chooseImage } from '../../utils/asyncWx';

Page({
    uploadImages: [],
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { id: 0, value: '体验问题', isActive: true },
            { id: 1, value: '商品、商家投诉', isActive: false }
        ],
        chooseImgs: [],
        textVal: "",
    },

    handleTabsItemChange(e) {
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        });
    },

    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['compressed', 'original'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
                });
            }
        })
    },

    handleRemoveImg(e) {
        const { index } = e.currentTarget.dataset;
        let { chooseImgs } = this.data;
        chooseImgs.splice(index, 1);
        this.setData({
            chooseImgs
        });
    },

    handleTextInput(e) {
        this.setData({
            textVal: e.detail.value
        });
    },

    handleFormSubmit() {
        const { textVal, chooseImgs } = this.data;
        if (!textVal.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: "none",
                mask: true
            });
            return;
        }

        wx.showLoading({
            title: '正在上传中',
            mask: true
        })

        if (chooseImgs.length != 0) {
            chooseImgs.forEach((v, i) => {
                wx.uploadFile({
                    filePath: v,
                    name: 'image',
                    url: 'https://media.mogu.com/image/scale?appKey=15m&w=500&h=500&quality=100',
                    success: (result) => {
                        const res = JSON.parse(result.data);
                        let url = res.result.url;
                        this.uploadImages.push(url);

                        if (i === chooseImgs.length - 1) {
                            wx.hideLoading()

                            console.log('提交到服务器');

                            this.setData({
                                textVal: "",
                                chooseImgs: []
                            })

                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    }
                })
            })
        } else {
            wx.hideLoading()

            console.log('只上传文字')
            wx.navigateBack({
                delta: 1,
            })
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