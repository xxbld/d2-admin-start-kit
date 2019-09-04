import { Action, getModule, VuexModule } from 'vuex-module-decorators'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'

export interface ID2UserState {
  info: any
}

export default class d2User extends VuexModule implements ID2UserState {
  info: any = {}

  /**
   * @description 设置用户数据
   * @param {*} info info
   */
  @Action
  set(info) {
    return new Promise(async resolve => {
      // store 赋值
      this.info = info
      // 持久化
      await d2DbModule.set({
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * @description 从数据库取用户数据
   * @param {Object} context
   */
  @Action
  load() {
    return new Promise(async resolve => {
      // store 赋值
      this.info = await d2DbModule.get({
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      })
      // end
      resolve()
    })
  }
}

export const d2UserModule = getModule(d2User)
