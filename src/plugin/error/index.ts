import store from '@/store'
import util from '@/libs/util'
import {d2LogModule} from "@/store/modules/d2admin/modules/log";

export default {
  install(Vue: any, options: {}) {
    Vue.config.errorHandler = function(error, instance, info) {
      Vue.nextTick(() => {
        // store 追加 log
        d2LogModule.push({
          message: `${info}: ${error.message}`,
          type: 'danger',
          meta: {
            error,
            instance
          }
        })

        // 只在开发模式下打印 log
        if (process.env.NODE_ENV === 'development') {
          util.log.capsule('D2Admin', 'ErrorHandler', 'danger')
          util.log.danger('>>>>>> 错误信息 >>>>>>')
          console.log(info)
          util.log.danger('>>>>>> Vue 实例 >>>>>>')
          console.log(instance)
          util.log.danger('>>>>>> Error >>>>>>')
          console.log(error)
        }
      })
    }
  }
}
