import { Middleware } from '@nuxt/types'

const authentic: Middleware = ({ route, redirect, store }) => {
  route.meta.forEach((meta: { [key: string]: number | string | boolean }) => {
    if (meta.authentic && !store.getters.isAuthenticated) {
      console.log('authentic now allowed')
      return redirect({ name: 'index' })
    }
  })
}

export default authentic
