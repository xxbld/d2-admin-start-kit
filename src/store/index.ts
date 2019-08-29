import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import { IAccountState } from './modules/d2admin/modules/account'
Vue.use(Vuex)
export interface IRootState {
  account: IAccountState
}

export default new Vuex.Store({
  modules: {
    d2admin
  }
})
