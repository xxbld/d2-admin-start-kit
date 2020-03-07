// 自定义全局类型 或者 拓展类型

import { I18nMessage } from "@/i18n";
import { ILog } from "@/libs/util.log";

declare global {
    // custom global type
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
        $open(url: string): void;
        $log: ILog;
        $languages: I18nMessage[];

        $env: string;
        $baseUrl: string;
        $version: string;
        $buildTime: string;
    }
}
