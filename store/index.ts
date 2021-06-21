import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from 'vuex/types/index'
import { State } from './state'
import { Mutations } from './mutations'
import { Actions } from './actions'

export interface RootState extends State {}
export interface RootGetters {}
export interface RootMutations extends Mutations {}
export interface RootActions extends Actions {}

export type Namespaced<T, U extends string> = {
  [P in keyof T & string as `${U}/${P}`]: T[P]
}

export interface Store
  extends Omit<VuexStore<any>, 'getters' | 'commit' | 'dispatch'> {
  getters: {
    [K in keyof RootGetters]: ReturnType<RootGetters[K]>
  }
  commit<
    K extends keyof RootMutations,
    P extends Parameters<RootMutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<RootMutations[K]>
  dispatch<
    K extends keyof RootActions,
    P extends Parameters<RootActions[K]>[1]
  >(
    key: K,
    payload: P,
    options?: DispatchOptions
  ): ReturnType<RootActions[K]>
}
