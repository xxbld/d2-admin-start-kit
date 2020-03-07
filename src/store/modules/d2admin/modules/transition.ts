// 设置文件
import setting from '@/setting'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { ID2MenuState } from '@/store/modules/d2admin/modules/menu'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'

export interface ID2TransitionState {
  active: boolean
}

@Module({ dynamic: true, store, name: 'd2Transition', namespaced: true })
export default class D2Transition extends VuexModule implements ID2TransitionState {
  active: boolean = setting.transition.active

  /**
   * @description 设置开启状态
   * @param {Object} context
   * @param {Boolean} active 新的状态
   */
  @Action
  set({ active }) {
    return new Promise(async resolve => {
      // store 赋值
      this.SET_ACTIVE(active)
      // 持久化
      await d2DbModule.set({
        dbName: 'sys',
        path: 'transition.active',
        value: this.active,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * 从数据库读取页面过渡动画设置
   */
  @Action
  load() {
    return new Promise(async resolve => {
      // store 赋值
      const active = (await d2DbModule.get({
        dbName: 'sys',
        path: 'transition.active',
        defaultValue: setting.transition.active,
        user: true
      })) as boolean
      this.SET_ACTIVE(active)
      // end
      resolve()
    })
  }

  @Mutation
  SET_ACTIVE(active: boolean) {
    this.active = active
  }
}

export const d2TransitionModule = getModule(D2Transition)
