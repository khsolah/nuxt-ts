import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxiosInstance(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }
