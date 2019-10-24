import Vue, { VNode } from 'vue'
import { i18nMessage } from './i18n'
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.types 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    /**
     * open Url in new tab
     * @param url
     */
    $open(url: string): void
    $log: log
    $languages: i18nMessage[]
    $baseUrl:string
  }
}
interface log {
  /**
   * @description 打印一个 [ title | text ] 样式的信息
   * @param {String} title title text
   * @param {String} info info text
   * @param {String} type style
   */
  capsule(title: string, info: string, type: string): any
  colorful(textArr: any): any
  default(text: string): any
  primary(text: string): any
  success(text: string): any
  warning(text: string): any
  danger(text: string): any
}
