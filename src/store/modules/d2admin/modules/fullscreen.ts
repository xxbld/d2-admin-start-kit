import screenfull from 'screenfull'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ID2FullScreenState {
  active: boolean
}

@Module({ dynamic: true, store, name: 'd2Fullscreen', namespaced: true })
export default class d2Fullscreen extends VuexModule implements ID2FullScreenState {
  active = false
  /**
   * @description 初始化监听
   * @param {Object} context
   */
  @Action
  listen() {

    return new Promise(resolve => {
      if (screenfull) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            this.SET_ACTIVE(false)
          }
        })
      }
      // end
      resolve()
    })
  }
  /**
   * @description 切换全屏
   */
  @Action
  toggle() {
    return new Promise(resolve => {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        this.SET_ACTIVE(false)
      } else {
        screenfull.request()
        this.SET_ACTIVE(true)
      }
      // end
      resolve()
    })
  }

  /**
   * @description 设置 store 里的全屏状态
   * @param {Boolean} active active
   */
  @Mutation
  SET_ACTIVE(active) {
    this.active = active
  }
}

export const d2FullscreenModule = getModule(d2Fullscreen)
