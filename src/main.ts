// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import { d2PageModule } from "@/store/modules/d2admin/modules/page";
import { d2MenuModule } from "@/store/modules/d2admin/modules/menu";
import { d2SearchModule } from "@/store/modules/d2admin/modules/search";
import { d2ReleasesModule } from "@/store/modules/d2admin/modules/releases";
import { d2AccountModule } from "@/store/modules/d2admin/modules/account";
import { d2UaModule } from "@/store/modules/d2admin/modules/ua";
import { d2FullscreenModule } from "@/store/modules/d2admin/modules/fullscreen";

// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    d2PageModule.init(frameInRoutes)
    //this.$store.commit('d2Page/init', frameInRoutes)
    // 设置顶栏菜单
    d2MenuModule.headerSet(menuHeader)
    // 设置侧边栏菜单
    d2MenuModule.asideSet(menuAside)
    // 初始化菜单搜索功能
    d2SearchModule.init(menuHeader)
  },
  mounted() {
    // 展示系统信息
    d2ReleasesModule.versionShow()
    // 用户登录后从数据库加载一系列的设置
    d2AccountModule.load().then()
    // 获取并记录用户 UA
    d2UaModule.GET_UA()
    // 初始化全屏监听
    d2FullscreenModule.listen().then()
  }
}).$mount('#app')
