const { storeBindingsBehavior } = require("mobx-miniprogram-bindings");
const { store } = require("../../store/store");

// components/numbers/numbers.js
Component({
    behaviors: [storeBindingsBehavior],

    storeBindings: {
        store,
        fields: {
            num1: () => store.num1,
            num2: (store) => store.num2,
            sum: 'sum'
        },
        actions: {
            updateNum2: 'updateNum2'
        }
    },

    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        btnHandler2(e) {
            this.updateNum2(e.target.dataset.step)
        }
    }
})
