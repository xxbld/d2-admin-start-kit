import hotkeys from 'hotkeys-js'
import { d2SearchModule } from '@/store/modules/d2admin/modules/search'

export default {
  components: {
    'd2-panel-search': () => import('../components/panel-search/index.vue')
  },
  mounted() {
    // 绑定搜索功能快捷键 [ 打开 ]
    hotkeys(this.searchHotkey.open, event => {
      event.preventDefault()
      this.searchPanelOpen()
    })
    // 绑定搜索功能快捷键 [ 关闭 ]
    hotkeys(this.searchHotkey.close, event => {
      event.preventDefault()
      this.searchPanelClose()
    })
  },
  beforeDestroy() {
    hotkeys.unbind(this.searchHotkey.open)
    hotkeys.unbind(this.searchHotkey.close)
  },
  computed: {
    searchActive: () => d2SearchModule.active,
    searchHotkey: () => d2SearchModule.hotkey
  },
  methods: {
    searchToggle: d2SearchModule.toggle,
    searchSet: d2SearchModule.set,
    /**
     * 接收点击搜索按钮
     */
    handleSearchClick() {
      this.searchToggle()
      if (this.searchActive) {
        setTimeout(() => {
          if (this.$refs.panelSearch) {
            this.$refs.panelSearch.focus()
          }
        }, 500)
      }
    },
    searchPanelOpen() {
      if (!this.searchActive) {
        this.searchSet(true)
        setTimeout(() => {
          if (this.$refs.panelSearch) {
            this.$refs.panelSearch.focus()
          }
        }, 500)
      }
    },
    // 关闭搜索面板
    searchPanelClose() {
      if (this.searchActive) {
        this.searchSet(false)
      }
    }
  }
}
