import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import d2admin, { ID2AdminModule } from './modules/d2admin'
import { release } from 'os';
import releases1 from './modules/d2admin/temp/releases';
import {IReleaseState} from './modules/d2admin/temp/releases';
import custom from './modules2'

Vue.use(Vuex)

export interface IRootState {
  d2Admin: ID2AdminModule
  release: IReleaseState
}


export default new Vuex.Store<any>({
  modules: {
    d2admin,
    custom
  }
})
