import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'page1'
})
export default class page1 extends Vue {
  @Prop()
  private msg!: string
  async mounted() {}

  protected render() {
    return (
      <d2-container>
        <template slot="header">Page 1 header</template>
        Hello World {this.msg}
      </d2-container>
    )
  }
}
