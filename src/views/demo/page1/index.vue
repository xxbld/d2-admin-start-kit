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
import releases from '@/store/modules/d2admin/temp/releases';
import store from '../../../store';



@Component({
  name: 'page1'
})
export default class page1 extends Vue {
  
  name: 'page1'
  async mounted() {
   const releaseModule =getModule(releases,store)
 
    console.log(releaseModule.ver1)
    // console.log(releaseModule.version)
    console.log(await releaseModule.showVersion())
  }
}
</script>
