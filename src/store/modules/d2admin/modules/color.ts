import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'
import store from '@/store'

export interface ID2ColorState {
    value: string
}
@Module({ dynamic: true, store, name: 'd2Color', namespaced: true })
export default class d2Color extends VuexModule implements ID2ColorState {
    // 颜色
    value = process.env.VUE_APP_ELEMENT_COLOR
    /**
     * @description 设置颜色
     * @param {Object} context
     * @param {String} color 尺寸
     */
    @Action
    set(color: string) {
        return new Promise(async resolve => {
            // 记录上个值
            const old = this.value
            // store 赋值
            const newColor = color || process.env.VUE_APP_ELEMENT_COLOR
            // 持久化
            await d2DbModule.set({
                dbName: 'sys',
                path: 'color.value',
                value: newColor,
                user: true
            })
            // 应用
            this.APPLY({
                oldColor: old,
                newColor: newColor
            })
            // end
            resolve()
        })
    }
    /**
     * @description 从持久化数据读取颜色设置
     * @param {Object} context
     */
    @Action
    load() {
        return new Promise(async resolve => {
            // 记录上个值
            const old = this.value
            // store 赋值
            const newColor = await d2DbModule.get({
                dbName: 'sys',
                path: 'color.value',
                defaultValue: process.env.VUE_APP_ELEMENT_COLOR,
                user: true
            })
            // 应用
            this.APPLY({
                oldColor: old,
                newColor: newColor
            })
            // end
            resolve()
        })
    }
    /**
     * @description 将 vuex 中的主题颜色设置应用到系统中
     * @param {Object} context
     * @param {Object} payload oldColor {String} 旧的颜色
     * @param {Object} payload newColor {String} 新颜色
     */
    @Mutation
    APPLY({ oldColor, newColor }) {
        this.value = newColor
        var options = {
            oldColors: [...forElementUI.getElementUISeries(oldColor)],
            newColors: [...forElementUI.getElementUISeries(newColor)]
        }
        client.changer.changeColor(options)
    }
}

export const d2ColorModule = getModule(d2Color)