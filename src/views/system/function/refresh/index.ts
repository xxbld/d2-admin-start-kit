import { Route, NavigationGuard } from 'vue-router';
import { Vue } from 'vue-property-decorator'
export default {
  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next((instance: Vue) => { instance.$router.replace(from.fullPath) })
  },
  render: h => h()
}
