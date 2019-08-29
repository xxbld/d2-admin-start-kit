import util from '@/libs/util'

export default {
  install (Vue: { prototype: { $open: (url: string) => void; }; }, options: any) {
    Vue.prototype.$open = util.open
  }
}
