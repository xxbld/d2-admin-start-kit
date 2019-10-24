import { Component, Prop, Vue } from 'vue-property-decorator'
import css from './index.scss'

@Component({
  name: 'd2-contextmenu'
})
export default class d2ContextMenu extends Vue {
  @Prop({ default: false, type: Boolean }) visible: boolean
  @Prop({ default: 0, type: Number }) x: number
  @Prop({ default: false, type: Number }) y: number

  get style() {
    return {
      left: this.x + 'px',
      top: this.y + 'px',
      display: this.visible ? 'block' : 'none '
    }
  }

  get flag() {
    if (this.visible) {
      // 注册全局监听事件 [ 目前只考虑鼠标解除触发 ]
      window.addEventListener('mousedown', this.watchContextmenu)
    }
    return this.visible
  }

  set flag(newVal) {
    this.$emit('update:visible', newVal)
  }
  watchContextmenu(event) {
    if (!this.$el.contains(event.target) || event.button !== 0) this.flag = false
    window.removeEventListener('mousedown', this.watchContextmenu)
  }

  mounted() {
    // 将菜单放置到body下
    document.querySelector('body').appendChild(this.$el)
  }
  render() {
    return (
      <div class={css.d2Contextmenu} v-show={this.flag} style={this.style}>
        <slot />
      </div>
    )
  }
}
