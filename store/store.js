// 创建store的实例对象
import { observable, action } from 'mobx-miniprogram'

export const store = observable({
    num1: 1,
    num2: 2,
    get sum() {
        return this.num1 + this.num2
    },
    updateNum1: action(function (step) {
        this.num1 += step
    }),
    updateNum2: action(function (step) {
        this.num2 += step
    })
})