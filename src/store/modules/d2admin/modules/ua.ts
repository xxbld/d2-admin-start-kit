import UaParser from 'ua-parser-js'
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'


export interface IUaState {
  data: {}
}
@Module({ namespaced: true, name: 'd2admin/ua' })
export default class ua extends VuexModule implements IUaState {
  data = {}

  @Mutation
  get(state) {
    this.data = new UaParser().getResult()
  }
}


