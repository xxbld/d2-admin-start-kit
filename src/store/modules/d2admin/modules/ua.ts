import UaParser from 'ua-parser-js'
import { getModule, Mutation, VuexModule } from 'vuex-module-decorators'

export interface ID2UaState {
  data: any
}

export default class d2Ua extends VuexModule implements ID2UaState {
  data: any
  @Mutation
  GET_UA() {
    this.data = new UaParser().getResult()
  }
}

export const d2UaModule = getModule(d2Ua)
