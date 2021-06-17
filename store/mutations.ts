import { MutationTree } from 'vuex/types/index'
import { State } from './state'

export enum MutationTypes {
  NUXT_SERVER_INIT = 'NUXT_SERVER_INIT'
}

export interface Mutations<S = State> {
  [MutationTypes.NUXT_SERVER_INIT]: (state: S) => void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.NUXT_SERVER_INIT]: _ => {
    // console.log('mutations - nuxt_server_init')
  }
}

export default mutations
