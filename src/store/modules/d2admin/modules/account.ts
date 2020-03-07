import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util'
import router from '@/router'
import { AccountLogin } from '@api/sys.login'
import { Action, getModule, Module, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { d2UserModule } from "@/store/modules/d2admin/modules/user";
import { d2GrayModule } from "@/store/modules/d2admin/modules/gray";
import { d2ThemeModule } from "@/store/modules/d2admin/modules/theme";
import { d2TransitionModule } from "@/store/modules/d2admin/modules/transition";
import { d2PageModule } from "@/store/modules/d2admin/modules/page";
import { d2MenuModule } from "@/store/modules/d2admin/modules/menu";
import { d2SizeModule } from "@/store/modules/d2admin/modules/size";
import { d2ColorModule } from './color';


@Module({ dynamic: true, store, name: 'd2Account', namespaced: true })
export default class D2Account extends VuexModule {
  /**
   * @description 登录
   * @param {Object} payload username {String} 用户账号
   * @param {Object} payload password {String} 密码
   * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
   */
  @Action
  login({ username = '', password = '' } = {}) {
    return new Promise((resolve, reject) => {
      // 开始请求登录接口
      AccountLogin({
        username,
        password
      })
        .then(async res => {
          // 设置 cookie 一定要存 uuid 和 token 两个 cookie
          // 整个系统依赖这两个数据进行校验和存储
          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          // token 代表用户当前登录状态 建议在网络请求中携带 token
          // 如有必要 token 需要定时更新，默认保存一天
          util.cookies.set('uuid', res.uuid)
          util.cookies.set('token', res.token)
          // 设置 vuex 用户信息
          await d2UserModule.set({
            name: res.name
          })
          // 用户登录后从持久化数据加载一系列的设置
          await this.load()
          // 结束
          resolve()
        })
        .catch(err => {
          console.log('err: ', err)
          reject(err)
        })
    })
  }

  /**
   * @description 注销用户并返回登录页面
   * @param {Object} payload confirm {Boolean} 是否需要确认
   */
  @Action
  logout({ confirm = false } = {}) {
    /**
     * @description 注销
     */
    async function logout() {
      // 删除cookie
      util.cookies.remove('token')
      util.cookies.remove('uuid')
      // 清空 vuex 用户信息
      await d2UserModule.set({})
      // 跳转路由
      await router.push({
        name: 'login'
      })
    }
    // 判断是否需要确认
    if (confirm) {
      d2GrayModule.SET_ACTIVE(true)
      MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
        type: 'warning'
      })
        .then(() => {
          d2GrayModule.SET_ACTIVE(false)
          logout().then(r => { })
        })
        .catch(() => {
          d2GrayModule.SET_ACTIVE(false)
          Message({
            message: '取消注销操作'
          })
        })
    } else {
      logout().then(r => { })
    }
  }
  /**
   * @description 用户登录后从持久化数据加载一系列的设置
   */
  @Action
  load() {
    return new Promise(async resolve => {
      // DB -> store 加载用户名
      await d2UserModule.load()
      // DB -> store 加载主题
      await d2ThemeModule.load()
      // DB -> store 加载页面过渡效果设置
      await d2TransitionModule.load()
      // DB -> store 持久化数据加载上次退出时的多页列表
      await d2PageModule.openedLoad()
      // DB -> store 持久化数据加载侧边栏折叠状态
      await d2MenuModule.asideCollapseLoad()
      // DB -> store 持久化数据加载全局尺寸
      await d2SizeModule.load()
      // DB -> store 持久化数据加载颜色设置
      await d2ColorModule.load()
      // end
      resolve()
    })
  }
}

export const d2AccountModule = getModule(D2Account)
