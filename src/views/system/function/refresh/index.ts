import { Vue } from 'vue-property-decorator'
export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    next(instance => instance.$router.replace(from.fullPath))
  },
  render: h => h()
})
