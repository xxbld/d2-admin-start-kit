<template>
  <el-tooltip
    effect="dark"
    :content="active ? '退出全屏' : '全屏'"
    placement="bottom">
    <el-button class="d2-mr btn-text can-hover" type="text" @click="toggle">
      <d2-icon v-if="active" name="compress"/>
      <d2-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { d2FullscreenModule } from '@/store/modules/d2admin/modules/fullscreen'
export default {
  computed: {
    active:()=>d2FullscreenModule.active
  },
  methods: {
    toggle:()=>d2FullscreenModule.toggle()
  }
}
</script>
