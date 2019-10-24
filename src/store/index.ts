import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { ID2AdminModule } from './modules/d2admin'
import { release } from 'os';
import {ID2UserState} from "@/store/modules/d2admin/modules/user";


Vue.use(Vuex)

export interface IRootState {
  d2User:ID2UserState
}


export default new Vuex.Store<IRootState>({
  modules: {
    // d2admin,
    // custom
  }
})
