<template>
  <div class="d2-layout-header-aside-group" :style="styleLayoutMainGroup" :class="{ grayMode: grayActive }">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex
      >
        <div class="logo-group" :style="{ width: asideCollapse ? asideWidthCollapse : asideWidth }" flex-box="0">
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`" />
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`" />
        </div>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars" />
        </div>
        <d2-menu-header flex-box="1" />
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <d2-header-search @click="handleSearchClick" />
          <d2-header-log />
          <d2-header-fullscreen />
          <d2-header-theme />
          <d2-header-size />
          <d2-header-locales />
          <d2-header-user />
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }"
        >
          <d2-menu-side />
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
              <d2-panel-search ref="panelSearch" @close="searchPanelClose" />
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs />
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
import d2Tabs from './components/tabs/index.vue'
import d2HeaderFullscreen from './components/header-fullscreen/index.vue'
import d2HeaderLocales from './components/header-locales/index.vue'
import d2HeaderSearch from './components/header-search/index.vue'
import d2HeaderSize from './components/header-size/index.vue'
import d2HeaderTheme from './components/header-theme/index.vue'
import d2HeaderUser from './components/header-user/index.vue'
import d2HeaderLog from './components/header-log/index.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
import { d2MenuModule } from '@/store/modules/d2admin/modules/menu'
import { d2PageModule } from '@/store/modules/d2admin/modules/page'
import { d2GrayModule } from '@/store/modules/d2admin/modules/gray'
import { d2TransitionModule } from '@/store/modules/d2admin/modules/transition'
import { d2ThemeModule } from '@/store/modules/d2admin/modules/theme'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'd2-layout-header-aside',
  mixins: [mixinSearch],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderLocales,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLog
  }
})
export default class layout extends Vue {
  // [侧边栏宽度] 正常状态
  asideWidth = '200px'
  // [侧边栏宽度] 折叠状态
  asideWidthCollapse = '65px'

  get keepAlive() {
    return d2PageModule.keepAlive
  }
  get grayActive() {
    return d2GrayModule.active
  }

  get transitionActive() {
    return d2TransitionModule.active
  }
  get asideCollapse() {
    return d2MenuModule.asideCollapse
  }
  get themeActiveSetting() {
    return d2ThemeModule.activeSetting
  }

  /**
   * @description 最外层容器的背景图片样式
   */
  get styleLayoutMainGroup() {
    return {
      ...(this.themeActiveSetting.backgroundImage
        ? {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
          }
        : {})
    }
  }

  asideCollapseToggle = d2MenuModule.asideCollapseToggle
  localAside =false;
  /**
   * 接收点击切换侧边栏的按钮
   */
  async handleToggleAside() {
    this.asideCollapseToggle()
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
