// 设置文件
import setting from '@/setting.ts'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'

export interface ID2ThemeState {
  list: { title: string; name: string; backgroundImage?: string; preview: string }[]
  activeName: string
}

@Module({ dynamic: true, store, name: 'd2Theme', namespaced: true })
export default class d2Theme extends VuexModule implements ID2ThemeState {
  list = setting.theme.list
  // 现在激活的主题 这应该是一个名字 不是对象
  activeName = setting.theme.list[0].name

  get activeSetting() {
    return this.list.find(theme => theme.name === this.activeName)
  }

  /**
   * @description 激活一个主题
   * @param {String} themeName 需要激活的主题名称
   */
  @Action
  set(themeName) {
    return new Promise(async resolve => {
      // 检查这个主题在主题列表里是否存在
      let activeName = this.list.find(e => e.name === themeName) ? themeName : this.list[0].name
      this.SET_ACTIVE_NAME(activeName)
      // 将 vuex 中的主题应用到 dom
      this.SET_DOM()
      // 持久化
      await d2DbModule.set({
        dbName: 'sys',
        path: 'theme.activeName',
        value: this.activeName,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * @description 从持久化数据加载主题设置     * @param {Object} context
   */
  @Action
  load() {
    return new Promise(async resolve => {
      // store 赋值
      let activeName = (await d2DbModule.get({
        dbName: 'sys',
        path: 'theme.activeName',
        defaultValue: this.list[0].name,
        user: true
      })) as string
      // 检查这个主题在主题列表里是否存在
      if (this.list.find(e => e.name === activeName)) {
        this.SET_ACTIVE_NAME(activeName)
      } else {
        this.SET_ACTIVE_NAME(this.list[0].name)
        // 持久化
        d2DbModule.set({
          dbName: 'sys',
          path: 'theme.activeName',
          value: this.activeName,
          user: true
        })
      }
      // 将 vuex 中的主题应用到 dom
      this.SET_DOM()
      // end
      resolve()
    })
  }

  @Mutation
  /**
   * @description 将 vuex 中的主题应用到 dom
   */
  SET_DOM() {
    document.body.className = `theme-${this.activeName}`
  }
  @Mutation
  SET_ACTIVE_NAME(activeName: string) {
    this.activeName = activeName
  }
}

export const d2ThemeModule = getModule(d2Theme)
