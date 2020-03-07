import { get } from 'lodash'
import router from '@/router'
import setting from '@/setting.ts'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { d2DbModule } from '@/store/modules/d2admin/modules/db'
import { Dictionary, RouteConfig } from 'vue-router/types/router'
// 判定是否需要缓存
const isKeepAlive = data => get(data, 'meta.cache', false)

export interface IOpened {
  name?: string
  fullPath?: string
  meta?: {
    title: string
    auth: boolean
  }
  query?: Dictionary<string | (string | null)[]>
  params1?: Dictionary<string>
  params?: any
}
export interface ID2PageState {
  pool: any
  opened: IOpened[]
  openedLoaded: boolean
  current: string
  keepAlive: any
}

@Module({ dynamic: true, store, name: 'd2Page', namespaced: true })
export default class d2Page extends VuexModule implements ID2PageState {
  current: string = ''
  keepAlive: any = []
  opened: IOpened[] = setting.page.opened
  openedLoaded = false
  pool: any = []

  /**
   * @description 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
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
   */
  @Action
  openedLoad() {
    return new Promise(async resolve => {
      // store 赋值
      const value = (await d2DbModule.get({
        dbName: 'sys',
        path: 'page.opened',
        defaultValue: setting.page.opened,
        user: true
      })) as IOpened[]
      // 在处理函数中进行数据优化 过滤掉现在已经失效的页签或者已经改变了信息的页签
      // 以 fullPath 字段为准
      // 如果页面过多的话可能需要优化算法
      // valid 有效列表 1, 1, 0, 1 => 有效, 有效, 失效, 有效
      const valid = []
      // 处理数据
      let opened = value
        .map(opened => {
          // 忽略首页
          if (opened.fullPath === '/index') {
            valid.push(1)
            return opened
          }
          // 尝试在所有的支持多标签页的页面里找到 name 匹配的页面
          const find = this.pool.find(item => item.name === opened.name)
          // 记录有效或无效信息
          valid.push(find ? 1 : 0)
          // 返回合并后的数据 新的覆盖旧的
          // 新的数据中一般不会携带 params 和 query, 所以旧的参数会留存
          return Object.assign({}, opened, find)
        })
        .filter((opened, index) => valid[index] === 1)
      // 标记已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
      this.SET_OPENED(opened)
      this.SET_OPENED_LOADED(true)
      // 根据 opened 数据生成缓存设置
      this.keepAliveRefresh()
      // end
      resolve()
    })
  }
  /**
   * 将 opened 属性赋值并持久化 在这之前请先确保已经更新了 state.opened
   */
  @Action
  openD2db() {
    return new Promise(async resolve => {
      // 设置数据
      d2DbModule.set({
        dbName: 'sys',
        path: 'page.opened',
        value: this.opened,
        user: true
      })
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 更新页面列表上的某一项
   * @param {Object} payload { index, params, query, fullPath } 路由信息
   */
  @Action
  openedUpdate({ index, params, query, fullPath }) {
    return new Promise(async resolve => {
      // 更新页面列表某一项
      let page = this.opened[index]
      page.params = params || page.name
      page.query = query || page.query
      page.fullPath = fullPath || page.fullPath
      this.opened.splice(index, 1, page)
      // 持久化
      await this.openD2db().then()
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 重排页面列表上的某一项
   * @param {Object} context
   * @param {Object} payload { oldIndex, newIndex } 位置信息
   */
  @Action
  openedSort ({ oldIndex, newIndex }) {
    return new Promise(async resolve => {
      // 重排页面列表某一项
      let page = this.opened[oldIndex]
      this.opened.splice(oldIndex, 1)
      this.opened.splice(newIndex, 0, page)
      // 持久化
      await this.openD2db().then()
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 新增一个 tag (打开一个页面)
   * @param {Object} payload new tag info
   */
  @Action
  add({ tag, params, query, fullPath }) {
    return new Promise(async resolve => {
      // 设置新的 tag 在新打开一个以前没打开过的页面时使用
      let newTag = tag
      newTag.params = params || newTag.params
      newTag.query = query || newTag.query
      newTag.fullPath = fullPath || newTag.fullPath
      // 添加进当前显示的页面数组
      this.opened.push(newTag)
      // 如果这个页面需要缓存 将其添加到缓存设置
      if (isKeepAlive(newTag)) {
        this.keepAlivePush(tag.name)
      }
      // 持久化
      await this.openD2db().then()
      // end
      resolve()
    })
  }
  /**
   * @class current
   * @description 打开一个新的页面
   * @param {Object} payload 从路由钩子的 to 对象上获取 { name, params, query, fullPath } 路由信息
   */
  @Action
  open({ name, params, query, fullPath }) {
    return new Promise(async resolve => {
      // 已经打开的页面
      let opened = this.opened
      // 判断此页面是否已经打开 并且记录位置
      let pageOpendIndex = 0
      const pageOpend = opened.find((page, index) => {
        const same = page.fullPath === fullPath
        pageOpendIndex = same ? index : pageOpendIndex
        return same
      })
      if (pageOpend) {
        // 页面以前打开过
        await this.openedUpdate({
          index: pageOpendIndex,
          params,
          query,
          fullPath
        })
      } else {
        // 页面以前没有打开过
        let page = this.pool.find(t => t.name === name)
        // 如果这里没有找到 page 代表这个路由虽然在框架内 但是不参与标签页显示
        if (page) {
          await this.add({
            tag: Object.assign({}, page),
            params,
            query,
            fullPath
          })
        }
      }
      this.currentSet(fullPath)
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 关闭一个 tag (关闭一个页面)
   * @param {Object} payload { tagName: 要关闭的标签名字 }
   */
  @Action
  close({ tagName }) {
    return new Promise(async resolve => {
      // 下个新的页面
      let newPage = this.opened[0]
      const isCurrent = this.current === tagName
      // 如果关闭的页面就是当前显示的页面
      if (isCurrent) {
        // 去找一个新的页面
        let len = this.opened.length
        for (let i = 1; i < len; i++) {
          if (this.opened[i].fullPath === tagName) {
            if (i < len - 1) {
              newPage = this.opened[i + 1]
            } else {
              newPage = this.opened[i - 1]
            }
            break
          }
        }
      }
      // 找到这个页面在已经打开的数据里是第几个
      const index = this.opened.findIndex(page => page.fullPath === tagName)
      if (index >= 0) {
        // 如果这个页面是缓存的页面 将其在缓存设置中删除
        this.keepAliveRemove(this.opened[index].name)
        // 更新数据 删除关闭的页面
        this.opened.splice(index, 1)
      }
      // 持久化
      await this.openD2db()
      // 最后需要判断是否需要跳到首页
      if (isCurrent) {
        const { name = '', params = {}, query = {} } = newPage
        let routerObj = {
          name,
          params,
          query
        }
        router.push(routerObj).then()
      }
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 关闭当前标签左边的标签
   * @param {Object} payload { pageSelect: 当前选中的tagName }
   */
  @Action
  closeLeft({ pageSelect }: any = {}) {
    return new Promise(async resolve => {
      const pageAim = pageSelect || this.current
      let currentIndex = 0
      this.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) {
          currentIndex = index
        }
      })
      if (currentIndex > 0) {
        // 删除打开的页面 并在缓存设置中删除
        this.opened.splice(1, currentIndex - 1).forEach(({ name }) => this.keepAliveRemove(name))
      }
      this.current = pageAim
      if (router.app.$route.fullPath !== pageAim) {
        router.push(pageAim).then()
      }
      // 持久化
      await this.openD2db().then()
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 关闭当前标签右边的标签
   * @param {Object} payload { pageSelect: 当前选中的tagName }
   */
  @Action
  closeRight({ pageSelect }: any = {}) {
    return new Promise(async resolve => {
      const pageAim = pageSelect || this.current
      let currentIndex = 0
      this.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) {
          currentIndex = index
        }
      })
      // 删除打开的页面 并在缓存设置中删除
      this.opened.splice(currentIndex + 1).forEach(({ name }) => this.keepAliveRemove(name))
      // 设置当前的页面
      this.current = pageAim
      if (router.app.$route.fullPath !== pageAim) {
        router.push(pageAim).then()
      }
      // 持久化
      await this.openD2db().then()
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 关闭当前激活之外的 tag
   * @param {Object} payload { pageSelect: 当前选中的tagName }
   */
  @Action
  closeOther({ pageSelect }: any = {}) {
    return new Promise(async resolve => {
      const pageAim = pageSelect || this.current
      let currentIndex = 0
      this.opened.forEach((page, index) => {
        if (page.fullPath === pageAim) {
          currentIndex = index
        }
      })
      // 删除打开的页面数据 并更新缓存设置
      if (currentIndex === 0) {
        this.opened.splice(1).forEach(({ name }) => this.keepAliveRemove(name))
      } else {
        this.opened.splice(currentIndex + 1).forEach(({ name }) => this.keepAliveRemove(name))
        this.opened.splice(1, currentIndex - 1).forEach(({ name }) => this.keepAliveRemove(name))
      }
      // 设置新的页面
      this.current = pageAim
      if (router.app.$route.fullPath !== pageAim) {
        router.push(pageAim).then()
      }
      // 持久化
      await this.openD2db().then()
      // end
      resolve()
    })
  }
  /**
   * @class opened
   * @description 关闭所有 tag
   * @param {Object} context
   */
  @Action
  closeAll() {
    return new Promise(async resolve => {
      // 删除打开的页面 并在缓存设置中删除
      this.opened.splice(1).forEach(({ name }) => this.keepAliveRemove(name))
      // 持久化
      await this.openD2db().then()
      // 关闭所有的标签页后需要判断一次现在是不是在首页
      if (router.app.$route.name !== 'index') {
        router
          .push({
            name: 'index'
          })
          .then()
      }
      // end
      resolve()
    })
  }

  /**
   * @class keepAlive
   * @description 从已经打开的页面记录中更新需要缓存的页面记录
   */
  @Mutation
  keepAliveRefresh() {
    this.keepAlive = this.opened.filter(item => isKeepAlive(item)).map(e => e.name)
  }
  /**
   * @description 删除一个页面的缓存设置
   * @param {String} name name
   */
  @Mutation
  keepAliveRemove(name) {
    const list = [...this.keepAlive]
    const index = list.findIndex(item => item === name)

    if (index !== -1) {
      list.splice(index, 1)
      this.keepAlive = list
    }
  }
  /**
   * @description 增加一个页面的缓存设置
   * @param {String} name name
   */
  @Mutation
  keepAlivePush(name) {
    const keep = [...this.keepAlive]
    keep.push(name)
    this.keepAlive = keep
  }
  /**
   * @description 清空页面缓存设置
   */
  @Mutation
  keepAliveClean() {
    this.keepAlive = []
  }
  /**
   * @class current
   * @description 设置当前激活的页面 fullPath
   * @param {String} fullPath new fullPath
   */
  @Mutation
  currentSet(fullPath) {
    this.current = fullPath
  }
  /**
   * @class pool
   * @description 保存 pool (候选池)
   * @param {Array} routes routes
   */
  @Mutation
  init(routes) {
    const pool = []
    const push = function(routes) {
      routes.forEach(route => {
        if (route.children) {
          push(route.children)
        } else {
          if (!route.hidden) {
            const { meta, name, path } = route
            pool.push({ meta, name, path })
          }
        }
      })
    }
    push(routes)
    this.pool = pool
  }

  @Mutation
  SET_OPENED(opened) {
    this.opened = opened
  }
  @Mutation
  SET_OPENED_LOADED(openedLoaded) {
    this.openedLoaded = openedLoaded
  }
}

export const d2PageModule = getModule(d2Page)
