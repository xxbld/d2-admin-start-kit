import { Route, NavigationGuard } from 'vue-router';
import { Vue, Component } from 'vue-property-decorator'


@Component({
  name: 'redirect'
})
export default class redirect extends Vue {
  beforeRouteEnter(to, from, next): void {
    next((instance: Vue) => instance.$router.replace(JSON.parse(from.params.route)))
  }
  created(){
    
  }
  render = (h: () => void) => h()
}
