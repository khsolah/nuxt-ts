import { Plugin } from '@nuxt/types'
import { initializeAxiosInstance } from '~/utilities/$axios'

const accessor: Plugin = ({ $axios }) => {
  initializeAxiosInstance($axios)
}

export default accessor
