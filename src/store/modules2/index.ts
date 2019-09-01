import { ModuleTree, Module } from 'vuex';
import { IRootState } from '..';
import releases from '@/store/modules/d2admin/temp/releases';
const modules: ModuleTree<IRootState> = {
  releases
}

export default {
  namespaced: true,
  modules
}  