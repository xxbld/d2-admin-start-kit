import Vue from 'vue'
import router from '@/router'
import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators'
import { ID2MenuState } from '@/store/modules/d2admin/modules/menu'
import store from '@/store'
import { d2PageModule } from '@/store/modules/d2admin/modules/page'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'

export interface ID2SizeState {
  value: string
}

@Module({ dynamic: true, store, name: 'd2Size', namespaced: true })
export default class d2Size extends VuexModule implements ID2SizeState {
  value = ''

  /**
   * @description 将当前的设置应用到 element
   * @param {Boolean} refresh 是否在设置之后刷新页面
   */
  @Action
  apply(refresh = false) {
    Vue.prototype.$ELEMENT.size = this.value
    if (refresh) {
      d2PageModule.keepAliveClean()
      router.replace('/refresh').then()
    }
  }
  /**
   * @description 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
   */
  @Action
  isLoaded() {
    if (this.value) return Promise.resolve()
    return new Promise(resolve => {
      const timer = setInterval(() => {
        if (this.value) {
          resolve(clearInterval(timer))
        }
      }, 10)
    })
  }
  /**
   * @description 设置尺寸
   * @param {String} size 尺寸
   */
  @Action
  set(size) {
    return new Promise(async resolve => {
      // store 赋值
      this.value = size
      // 应用
      this.apply()
      // 持久化
      await d2DbModule.set({
        dbName: 'sys',
        path: 'size.value',
        value: this.value,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * @description 从持久化数据读取尺寸设置
   */
  @Action
  load() {
    return new Promise(async resolve => {
      // store 赋值
      this.value = (await d2DbModule.get({
        dbName: 'sys',
        path: 'size.value',
        defaultValue: 'default',
        user: true
      })) as string

      // 应用
      this.apply()
      // end
      resolve()
    })
  }
}
export const d2SizeModule =getModule(d2Size)
