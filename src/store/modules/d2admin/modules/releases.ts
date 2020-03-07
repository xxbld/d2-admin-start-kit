import util from '@/libs/util'
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IReleaseState {
  version: string
}

@Module({ dynamic: true, store, name: 'd2Releases', namespaced: true })
export default class D2Releases extends VuexModule implements IReleaseState {
  version = 'abc'

  /**
   * @description 显示版本信息
   */
  @Mutation
  versionShow() {
    util.log.capsule('D2Admin', `v${process.env.VUE_APP_VERSION}`)
    console.log('D2 Admin  https://github.com/d2-projects/d2-admin')
    console.log('D2 Crud   https://github.com/d2-projects/d2-crud')
    console.log('Document  https://fairyever.com/d2-admin/doc/zh/')
    console.log('请不要吝啬您的 star，谢谢 ~')
  }
}

export const d2ReleasesModule = getModule(D2Releases)
