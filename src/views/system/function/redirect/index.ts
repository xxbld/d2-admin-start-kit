import { Vue } from 'vue-property-decorator'
export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    next(instance => instance.$router.replace(JSON.parse(from.params.route)))
  },
  render: h => h()
})
