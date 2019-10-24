<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import util from '@/libs/util'
@Component({
  name: 'app'
})
export default class app extends Vue {
  @Watch('$i18n.locale')
  onI18nChange(val, oldVal) {
    this.i18nHandle(val)
  }

  created() {
    this.i18nHandle(this.$i18n.locale)
  }
  i18nHandle(val, oldVal?): void {
    util.cookies.set('lang', val, {})
    document.querySelector('html').setAttribute('lang', val)
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
