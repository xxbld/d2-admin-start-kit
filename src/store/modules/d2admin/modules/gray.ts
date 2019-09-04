import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";

export interface ID2Gray {
  active:boolean
}
@Module({ dynamic: true, store, name: "d2Gray", namespaced: true })
export default class d2Gray extends VuexModule implements ID2Gray{
  active: boolean = false;

  /**
   * @description 切换灰度状态
   */
  @Mutation
  toggle () {
    this.active = !this.active
  }

  /**
   * @description 设置灰度模式
   * @param {Boolean} active active
   */
  @Mutation
  SET_ACTIVE (active) {
    this.active = active
  }
}

export const d2GrayModule = getModule(d2Gray)

export const gray= {
  namespaced: true,
  state: {
    // 灰度
    active: false
  },
  mutations: {
    /**
     * @description 切换灰度状态
     * @param {Object} state state
     */
    toggle (state) {
      state.active = !state.active
    },
    /**
     * @description 设置灰度模式
     * @param {Object} state state
     * @param {Boolean} active active
     */
    set (state, active) {
      state.active = active
    }
  }
}
