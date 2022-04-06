// components/test/test.js
const myBehavior = require('../../behaviors/my-behavior')

Component({
    behaviors: [myBehavior],

    options: {
        styleIsolation: 'isolated', // 样式隔离配置 isolated禁止 apply-shared单向 shared双向
        pureDataPattern: /^_/,
        multipleSlots: true
    },

    /**
     * 组件的属性列表
     */
    properties: {
        max: {
            type: Number,
            value: 10
        },
        count: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        _rgb: {
            r: 0,
            g: 0,
            b: 0
        },
        fullColor: '0, 0, 0'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeR() {
            this.setData({
                '_rgb.r': this.data._rgb.r + 5 > 255 ? 255 : this.data._rgb.r + 5
            })
        },
        changeG() {
            this.setData({
                '_rgb.g': this.data._rgb.g + 5 > 255 ? 255 : this.data._rgb.g + 5
            })
        },
        changeB() {
            this.setData({
                '_rgb.b': this.data._rgb.b + 5 > 255 ? 255 : this.data._rgb.b + 5
            })
        },
        _randomColor() {
            this.setData({
                _rgb: {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256),
                }
            })
        },
        addCount() {
            this.setData({
                count: this.properties.count + 1
            })
            this.triggerEvent('sync', { value: this.properties.count })
        }
    },
    observers: {
        '_rgb.**': function (obj) {
            this.setData({
                fullColor: `${obj.r}, ${obj.g}, ${obj.b}`
            })
        }
    },
    lifetimes: {
        created: function () {
            // 在组件实例刚刚被创建时执行
        },
        attached: function () {
            // 在组件实例进入页面节点树时执行
        },
        ready: function () {
            // 在组件在视图层布局完成后执行
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        show: function () {
            // 页面被展示
            this._randomColor()
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    }
})
