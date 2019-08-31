import request from '@/plugin/axios'
import { AxiosPromise, AxiosResponse } from 'axios'

/**
 * 因为使用了拦截器,导致返回值都已经解包过
 */
export interface IAccountLogin {
  uuid?: string
  token?: string
  name?: string
}

export function AccountLogin(data){
  return <Promise<IAccountLogin>>request({
    url: '/login',
    method: 'post',
    data
  })
}
