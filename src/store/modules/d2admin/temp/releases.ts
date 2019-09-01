import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from "vuex-module-decorators";
import util from '@/libs/util'
export interface IReleaseState {
  version:string
}

// @Module({dynamic:true,store, name:'custom/releases' })
@Module({namespaced:true, name:'custom/releases' })
export default class releases extends VuexModule implements IReleaseState {
  version ='abc'
  tesdf = 3
  
  /**
   * @description 显示版本信息
   * @param {Object} state state
   */
  @Mutation
  versionShow() {
    util.log.capsule('D2Admin', `v${process.env.VUE_APP_VERSION}`)
    console.log('D2 Admin  https://github.com/d2-projects/d2-admin')
    console.log('D2 Crud   https://github.com/d2-projects/d2-crud')
    console.log('Document  https://doc.d2admin.fairyever.com/zh/')
    console.log('请不要吝啬您的 star，谢谢 ~')
  }
  
  get ver1(){
    return this.version
  }
  
  @Action
  showVersion(){
    console.log('action');
    console.log(this.getters);
  }

}
