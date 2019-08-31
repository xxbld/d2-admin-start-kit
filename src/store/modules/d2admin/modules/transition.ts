// 设置文件
import setting from '@/setting.ts'

import { Module } from 'vuex'
import { ID2AdminModule } from '@/store/modules/d2admin'
import { IUserState } from '@/store/modules/d2admin/modules/user'

export interface ITransitionState {
  active: boolean
}

const transitionModule: Module<ITransitionState, ID2AdminModule> = {
  namespaced: true,
  state: {
    // 是否开启页面过度动画
    active: setting.transition.active
  },
  actions: {
    /**
     * @description 设置开启状态
     * @param {Object} context
     * @param {Boolean} active 新的状态
     */
    set({ state, dispatch }, active) {
      return new Promise(async resolve => {
        // store 赋值
        state.active = active
        // 持久化
        await dispatch(
          'd2admin/db/set',
          {
            dbName: 'sys',
            path: 'transition.active',
            value: state.active,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * 从数据库读取页面过渡动画设置
     * @param {Object} context
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.active = await dispatch(
          'd2admin/db/get',
          {
            dbName: 'sys',
            path: 'transition.active',
            defaultValue: setting.transition.active,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    }
  }
}

export default transitionModule
