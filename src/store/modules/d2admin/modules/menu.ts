import { uniqueId } from 'lodash'
// 设置文件
import setting from '@/setting'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'
import { type } from 'os'

/**
 * 给菜单数据补充上 path 字段
 * https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementMenuPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...(e.children
      ? {
          children: supplementMenuPath(e.children)
        }
      : {})
  }))
}

export interface ID2MenuState {
  header: any
  aside: any
  asideCollapse: boolean
}

@Module({ dynamic: true, store, name: 'd2Menu', namespaced: true })
export default class d2Menu extends VuexModule implements ID2MenuState {
  header = []
  // 侧栏菜单
  aside = []
  // 侧边栏收缩
  asideCollapse: boolean = false

  /**
   * 设置侧边栏展开或者收缩
   * @param {Boolean} collapse is collapse
   */
  @Action
  asideCollapseSet(collapse: boolean) {
    return new Promise(async resolve => {
      // store 赋值
      this.SET_ASIDE_COLLAPSE(collapse)
      // 持久化
      d2DbModule.set({
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: this.asideCollapse,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * 切换侧边栏展开和收缩
   */
  @Action
  asideCollapseToggle() {
    return new Promise(async resolve => {
      // store 赋值
      this.SET_ASIDE_COLLAPSE(!this.asideCollapse)

      // 持久化
      d2DbModule.set({
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: this.asideCollapse,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * 从持久化数据读取侧边栏展开或者收缩
   */
  @Action
  asideCollapseLoad() {
    return new Promise(async resolve => {
      // store 赋值
      let asideCollapse = await d2DbModule.get({
        dbName: 'sys',
        path: 'menu.asideCollapse',
        defaultValue: setting.menu.asideCollapse,
        user: true
      })
      let doubleCheck = asideCollapse === 'true'
      this.SET_ASIDE_COLLAPSE(doubleCheck)
      // end
      resolve()
    })
  }

  /**
   * @description 设置顶栏菜单
   * @param {Array} menu menu setting
   */
  @Mutation
  headerSet(menu) {
    // store 赋值
    this.header = supplementMenuPath(menu)
  }
  /**
   * @description 设置侧边栏菜单
   * @param {Array} menu menu setting
   */
  @Mutation
  asideSet(menu) {
    // store 赋值
    this.aside = supplementMenuPath(menu)
  }
  @Mutation
  SET_ASIDE_COLLAPSE(value: boolean) {
    console.log(value)
    this.asideCollapse = value
    console.log(this.asideCollapse)
  }
}

export const d2MenuModule = getModule(d2Menu)
