/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
import { VuexModule } from 'vuex-module-decorators'
import { ModuleTree } from 'vuex'


const files = require.context('./modules', false, /\.ts$/)

const modules: ModuleTree<any> = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default {
  namespaced: true,
  modules
}

export interface ID2AdminModule {
  user: any
  ua: any
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
