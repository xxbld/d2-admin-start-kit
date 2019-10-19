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


