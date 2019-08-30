import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

interface IErrorLog {
    err: Error
    vm: any
    info: string
    url: string
}

export interface IErrorLogState {
    logs: IErrorLog[]
}

@Module({  name: 'd2admin/errorLog',namespaced:true })
export default class ErrorLog extends VuexModule implements IErrorLogState {
    public logs: IErrorLog[] = []

    @Mutation
    private ADD_ERROR_LOG(log: IErrorLog) {
        this.logs.push(log)
    }

    @Mutation
    private CLEAR_ERROR_LOG() {
        this.logs.splice(0)
    }

    @Action
    public AddErrorLog(log: IErrorLog) {
        this.ADD_ERROR_LOG(log)
    }

    @Action
    public ClearErrorLog() {
        console.log("clear")
        this.CLEAR_ERROR_LOG()
    }

    get ErrorLog() {
        return this.logs
    }
}

