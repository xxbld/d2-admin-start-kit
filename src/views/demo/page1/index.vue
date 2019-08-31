<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
  </d2-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

@Component({
  name: 'page1'
})
export default class page1 extends Vue {
  name: 'page1'
  public mounted() {
   
  }
}
</script>
