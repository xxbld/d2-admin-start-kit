<template>
  <el-color-picker
    class="btn-text can-hover"
    :value="value"
    :predefine="predefine"
    size="mini"
    @change="set"
  />
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import { d2ColorModule } from '@/store/modules/d2admin/modules/color'

export default {
  name: 'd2-header-color',
  data() {
    return {
      predefine: ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']
    }
  },
  computed: {
    value: function() {
      return d2ColorModule.value
    }
  },
  watch: {
    value(value) {
      this.set(value)
    }
  },
  methods: {
    set(value) {
      d2ColorModule.set(value)
    }
  }
}
</script>
