import { Context } from '@nuxt/types/app'
import { ActionContext, CommitOptions, ActionTree } from 'vuex/types/index'
import { State } from './state'
import { Mutations } from './mutations'

interface AugumentedActionContext
  extends Omit<ActionContext<State, State>, 'commit' | 'dispatch'> {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

export enum ActionTypes {
  NUXT_SERVER_INIT = 'nuxtServerInit'
}

export interface Actions {
  [ActionTypes.NUXT_SERVER_INIT]: (
    {
      commit
    }: {
      commit: AugumentedActionContext['commit']
    },
    payload: { $cookies: Context['$cookies']; query: Context['query'] }
  ) => void
}

const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.NUXT_SERVER_INIT]: (_, { $cookies, query }) => {
    if (
      typeof query.id_token === 'string' &&
      typeof query.refresh_token === 'string'
    ) {
      $cookies.set('idToken', query.id_token)
      $cookies.set('refreshToken', query.refresh_token)

      // TODO store id_token and refresh_token in store
    } else if ($cookies.get('idToken') && $cookies.get('refreshToken')) {
      // TODO store id_token and refresh_token in store
    }
  }
}

export default actions
