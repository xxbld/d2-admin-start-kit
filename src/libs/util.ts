import {ICookies} from './util.cookies'
import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import { ILog } from './util.log';

export interface Util{
  cookies:ICookies
  db:any
  log:ILog
  title?:(titleText:string)=>void
  open?:(url:string)=>void
}

const util:Util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText:string) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url:string) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

export default util
