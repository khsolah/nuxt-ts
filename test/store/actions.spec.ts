import Cookies from '../mock/$cookies'
import actions, { ActionTypes } from '~/store/actions'

const $cookies = Cookies.getInstance()
let query: { [K: string]: string } = {}

describe('Vuex', () => {
  describe('Index Actions', () => {
    beforeEach(() => {
      query = {}
      $cookies.removeAll()
    })
    describe(ActionTypes.NUXT_SERVER_INIT, () => {
      it('Empty query and $cookies', () => {
        actions[ActionTypes.NUXT_SERVER_INIT](
          { commit: jest.fn() },
          { $cookies, query }
        )

        expect($cookies.get('id_token')).toBeUndefined()
        expect($cookies.get('refresh_token')).toBeUndefined()
      })

      it('Query with id_token and refresh_token', () => {
        query = {
          id_token: '[id_token]',
          refresh_token: '[refresh_token]'
        }

        actions[ActionTypes.NUXT_SERVER_INIT](
          { commit: jest.fn() },
          { $cookies, query }
        )

        expect($cookies.get('idToken')).toStrictEqual('[id_token]')
        expect($cookies.get('refreshToken')).toStrictEqual('[refresh_token]')
      })

      it('Empty query, but found in $cookies', () => {
        $cookies.setAll([
          { key: 'idToken', value: '[idToken in cookies]' },
          { key: 'refreshToken', value: '[refreshToken in cookies]' }
        ])

        actions[ActionTypes.NUXT_SERVER_INIT](
          { commit: jest.fn() },
          { $cookies, query }
        )

        expect($cookies.get('idToken')).toStrictEqual('[idToken in cookies]')
        expect($cookies.get('refreshToken')).toStrictEqual(
          '[refreshToken in cookies]'
        )
      })
    })
  })
})
