import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IErrorLog {
  err: Error
  vm?: any
  info?: string
  url?: string
}

export interface IErrorLogState {
  logs: IErrorLog[]
}

@Module({ name: 'd2admin/errorLog', namespaced: true })
export default class ErrorLog extends VuexModule implements IErrorLogState {
  public logs: IErrorLog[] = []

  @Mutation
  private ADD_ERROR_LOG(log: IErrorLog) {
    this.logs.push(log)
  }

  @Mutation
  private CLEAR_ERROR_LOG() {
    console.log('Clear Error List')
    this.logs.splice(0)
  }

  @Action
  public AddErrorLog(log: IErrorLog) {
    const info = this.context.dispatch(
      'd2admin/db/get',
      {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      },
      { root: true }
    )
    console.log(info)
    this.ADD_ERROR_LOG(log)
  }

  @Action
  public ClearErrorLog() {
    console.log('clear')
    this.CLEAR_ERROR_LOG()
  }
  
  @Action
  public TestPromis()
  {
    return new Promise(async resolve => {
        // store 赋值
        const info = await this.context.dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
        
        console.log(this)
         this.CLEAR_ERROR_LOG()
  
        // end
        resolve()
      })
  }
  
  get ErrorLog() {
    return this.logs
  }
}
