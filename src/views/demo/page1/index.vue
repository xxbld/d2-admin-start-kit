<template>
  <d2-container>
    <template slot="header"
      >Page 1 header</template
    >
    Hello World
  </d2-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import ErrorLog from '@/store/modules/d2admin/modules/errorLog'
@Component({
  name: 'page1'
})
export default class page1 extends Vue {
  name: 'page1'
  public mounted() {
    // const mo = getModule(ErrorLog, this.$store)
    // console.log(this.$store.state.d2admin.errorLog)
    // console.log(mo.ErrorLog)
  }
}
</script>
