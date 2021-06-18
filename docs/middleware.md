# Middleware

## Usage

if you want to add a meta on `nuxt-link` like this

```html
<nuxt-link :to="{ name: 'some-page', meta: { authentic: false } }">
</nuxt-link>
```

it won't work.
instead, you can register a middleware to do this

```typescript
// ~/middleware/authentic.ts
import { Middleware } from '@nuxt/types'

const authentic: Middleware = ({ route, redirect, store }) => {
  route.meta.forEach((meta: { [key: string]: number | string | boolean }) => {
    if (meta.authentic && !store.getters['isAuthenticated']) {
      return redirect({ name: 'login' })
    }
  })
}

export default authentic
```

```typescript
import Vue from 'vue'
import authentic from '~/middleware/authentic'

export default Vue.extend({
  middleware: [authentic]
})
```

also can register it to `middleware` in `nuxt.config.ts` as global middleware

```typescript
export default {
  router: {
    middleware: ['authentic']
  }
}
```
