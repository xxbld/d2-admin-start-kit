import dayjs from 'dayjs'
import { get } from 'lodash'
import util from '@/libs/util'
import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators'
import store from '@/store'
import { d2UserModule } from '@/store/modules/d2admin/modules/user'

export interface ID2LogState {
  log: any
}
@Module({ dynamic: true, store, name: 'd2Log', namespaced: true })
export default class d2Log extends VuexModule {
  log = []

  /**
   * @description 返回现存 log (all) 的条数

   */
  get length() {
    return this.log.length
  }
  /**
   * @description 返回现存 log (error) 的条数
   */
  get lengthError() {
    return this.log.filter(log => log.type === 'danger').length
  }

  /**
   * @description 添加一个日志
   * @param {String} param message {String} 信息
   * @param {String} param type {String} 类型
   */
  @Action
  push({ message, type = 'info', meta = {} }) {
    this.pushLog({
      message,
      type,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      meta: {
        // 当前用户信息
        user: d2UserModule.info,
        // 当前用户的 uuid
        uuid: util.cookies.get('uuid'),
        // 当前的 token
        token: util.cookies.get('token'),
        // 当前地址
        url: get(window, 'location.href', ''),
        // 用户设置
        ...meta
      }
    })
  }

  /**
   * @description 添加日志
   * @param {Object} log data
   */
  @Mutation
  pushLog(log) {
    this.log.push(log)
  }
  /**
   * @description 清空日志
   */
  @Action
  public cleanLog() {
    // store 赋值
    this.log = []
  }
}

export const d2LogModule = getModule(d2Log)
