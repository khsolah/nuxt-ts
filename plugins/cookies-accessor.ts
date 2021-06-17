import { Plugin } from '@nuxt/types'
import { initializeCookies } from '~/utilities/$cookies'

const accessor: Plugin = ({ $cookies }: any) => {
  initializeCookies($cookies)
}

export default accessor
