import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'
import store from '@/store'

export interface ID2UserState {
  info: any
}
@Module({ dynamic: true, store, name: 'd2User', namespaced: true })
export default class D2User extends VuexModule implements ID2UserState {
  info: any = {}

  /**
   * @description 设置用户数据
   * @param {*} info info
   */
  @Action
  set(info) {
    return new Promise(async resolve => {
      // store 赋值
      this.SET_INFO(info)
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
   */
  @Action
  load() {
    return new Promise(async resolve => {
      // store 赋值
      const info = await d2DbModule.get({
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      })
      this.SET_INFO(info)
      // end
      resolve()
    })
  }
  @Mutation
  SET_INFO(info){
    this.info=info
  }

}

export const d2UserModule = getModule(D2User)
