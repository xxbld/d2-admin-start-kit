import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from "vuex-module-decorators";
import store from '@/store'

import { get } from 'lodash'
import router from '@/router'
import setting from '@/setting.ts'

// 判定是否需要缓存
const isKeepAlive = (data: any) => get(data, 'meta.cache', false)

export interface IOpened {
  name: string
  fullPath: string
  meta: {
    title: string
    auth: boolean
  }
}
export interface IPageState {
  pool: any
  opened: IOpened[]
  openedLoaded: false
  current: string
  keepAlive: any
}

@Module({ dynamic: true, store, name: "page1", namespaced: true })
class page extends VuexModule implements IPageState {
  //state
  pool: any; opened: IOpened[];
  openedLoaded: false;
  current: string;
  keepAlive: any;

  /**
 * @description 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
 * @param {Object} context
 */
  @Action
  isLoaded() {
    if (this.openedLoaded) return Promise.resolve()
    return new Promise(resolve => {
      const timer = setInterval(() => {
        if (this.openedLoaded) {
          resolve(clearInterval(timer))
        }
      }, 10)
    })
  }

  /**
     * @class opened
     * @description 从持久化数据载入标签页列表
     * @param {Object} context
     */
  @Action
  openedLoad() {
    return new Promise(async resolve => {
      // store 赋值
      const value = await this.context.dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'page.opened',
        defaultValue: setting.page.opened,
        user: true
      }, { root: true })
      // 在处理函数中进行数据优化 过滤掉现在已经失效的页签或者已经改变了信息的页签
      // 以 fullPath 字段为准
      // 如果页面过多的话可能需要优化算法
      // valid 有效列表 1, 1, 0, 1 => 有效, 有效, 失效, 有效
      const valid = []
      // 处理数据
      state.opened = value.map(opened => {
        // 忽略首页
        if (opened.fullPath === '/index') {
          valid.push(1)
          return opened
        }
        // 尝试在所有的支持多标签页的页面里找到 name 匹配的页面
        const find = state.pool.find(item => item.name === opened.name)
        // 记录有效或无效信息
        valid.push(find ? 1 : 0)
        // 返回合并后的数据 新的覆盖旧的
        // 新的数据中一般不会携带 params 和 query, 所以旧的参数会留存
        return Object.assign({}, opened, find)
      }).filter((opened, index) => valid[index] === 1)
      // 标记已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
      state.openedLoaded = true
      // 根据 opened 数据生成缓存设置
      commit('keepAliveRefresh')
      // end
      resolve()
    })
  }
}