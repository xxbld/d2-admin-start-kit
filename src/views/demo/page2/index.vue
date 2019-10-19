<template>
  <d2-container>
    <template slot="header">Page 2 header</template>
    Hello World
    </d2-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { d2UserModule } from '@/store/modules/d2admin/modules/user'

@Component({
  name:'page2'
})
export default class page2 extends Vue{

}
</script>
