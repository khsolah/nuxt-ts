# Nuxt Modules

## Axios

install

```bash
npm install @nuxtjs/axios
```

Then add it to `modules` section in `nuxt.config.ts`

```typescript
export default {
  // ...
  modules: ['@nuxtjs/axios']
  axios: {
    // your axios config
  }
}
```

And add `@nuxtjs/axios` to `types` in `tsconfig.json`

```json
{
  "types": [
    "@nuxtjs/axios"
  ]
}
```

But if you want to access Nuxt Axios Instance in your Vuex, you must add a plugin like this

```typescript
// ~/plugins/axios-accessor.ts
import { Plugin } from '@nuxt/types'
import { initializeAxiosInstance } from '~/utilities/$axios'

const accessor: Plugin = ({ $axios }) => {
  initializeAxiosInstance($axios)
}

export default accessor
```

```typescript
// ~/utilities/$axios.ts
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxiosInstance(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }
```

Last registered the axios plugin to `plugins` in `nuxt.config.ts`

```typescript
export default {
  plugins: ['~/plugins/axios-accessor.ts']
}
```

## Cookie-Universal-Nuxt

Same way as `Axios`

```bash
npm i --save cookie-universal-nuxt
```

```typescript
// ~/plugins/cookies-accessor.ts
import { Plugin } from '@nuxt/types'
import { initializeCookies } from '~/utilities/$cookies'

const accessor: Plugin = ({ $cookies }: any) => {
  initializeCookies($cookies)
}

export default accessor
```

```typescript
// ~/utilities/$cookies.ts
import { NuxtCookies } from 'cookie-universal-nuxt'

let $cookies: NuxtCookies

export function initializeCookies(cookiesInstance: NuxtCookies) {
  $cookies = cookiesInstance
}

export { $cookies }
```

Add `cookie-universal-nuxt` to `modules` and cookies plugin to `plugins` in `nuxt.config.ts`

```typescript
export default {
  modules: [
    'cookie-universal-nuxt'
  ],
  plugins: ['~/plugins/cookies-accessor.ts']
}
```
