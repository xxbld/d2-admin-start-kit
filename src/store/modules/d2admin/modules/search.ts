import setting from '@/setting'
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { ID2MenuState } from '@/store/modules/d2admin/modules/menu'

export interface ID2SearchState {
  active: boolean
  hotkey: {
    open: string
    close: string
  }
  pool: any
}

@Module({ dynamic: true, store, name: 'd2Search', namespaced: true })
export default class d2Search extends VuexModule implements ID2SearchState {
  active = false
  // 快捷键
  hotkey = {
    open: setting.hotkey.search.open,
    close: setting.hotkey.search.close
  }
  // 所有可以搜索的页面
  pool = []

  /**
   * @description 切换激活状态
   */
  @Mutation
  toggle() {
    this.active = !this.active
  }
  /**
   * @description 设置激活模式
   * @param {Boolean} active active
   */
  @Mutation
  set(active) {
    this.active = active
  }
  /**
   * @description 初始化
   * @param {Array} menu menu
   */
  @Mutation
  init(menu) {
    const pool = []
    const push = function(menu, titlePrefix = []) {
      menu.forEach(m => {
        if (m.children) {
          push(m.children, [...titlePrefix, m.title])
        } else {
          pool.push({
            ...m,
            fullTitle: [...titlePrefix, m.title].join(' / ')
          })
        }
      })
    }
    push(menu)
    this.pool = pool
  }
}

export const d2SearchModule = getModule(d2Search)
