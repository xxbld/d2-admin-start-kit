import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import d2admin, { ID2AdminModule } from './modules/d2admin'


Vue.use(Vuex)

export interface IRootState {
  search:any
}

export default new Vuex.Store<IRootState>({
  modules: {
    d2admin
  }
})
