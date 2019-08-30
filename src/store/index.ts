import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import d2admin, { ID2AdminModule } from './modules/d2admin'
import { IAccountState } from './modules/d2admin/modules/account'

Vue.use(Vuex)

export interface IRootState {
  d2admin:ID2AdminModule
}

export default new Vuex.Store<IRootState>({
  modules: {
    d2admin
  }
})
