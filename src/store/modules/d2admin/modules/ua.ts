import UaParser from 'ua-parser-js'
import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from "@/store";

export interface ID2UaState {
  data: any
}
@Module({ dynamic: true, store, name: 'd2Ua', namespaced: true })
export default class D2Ua extends VuexModule implements ID2UaState {
  data: any
  @Mutation
  GET_UA() {
    this.data = new UaParser().getResult()
  }
}

export const d2UaModule = getModule(D2Ua)
