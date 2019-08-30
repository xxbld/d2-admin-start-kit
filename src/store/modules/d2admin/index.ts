/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
import { VuexModule } from 'vuex-module-decorators'
import { ModuleTree } from 'vuex'
import { IUaState } from '@/store/modules/d2admin/modules/ua'
import { IUserState } from '@/store/modules/d2admin/modules/user'

const files = require.context('./modules', false, /\.js$/)
const files2 = require.context('./modules', false, /\.ts$/)
const modules: ModuleTree<any> = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
files2.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files2(key).default
})
export default {
  namespaced: true,
  modules
}

export interface ID2AdminModule {
  user: IUserState
  ua: IUaState
  transition: any
  size: any
  theme: any
  search: any
  releases: any
  page: any
  menu: any
  log: any
  gray: any
  fullscreen: any
  db: any
  account: any
}
