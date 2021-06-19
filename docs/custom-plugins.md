# Custom Plugins

## Lazyloading

### Usage

use `v-lazy`

```html
<template>
  <div>
    <img src="" alt="" v-lazy="'PUT YOUR IMAGE URL HERE'" />
    <div src="" alt="" v-lazy:background=="'PUT YOUR IMAGE URL HERE'"" />
  </div>
</template>
```

### Implementation

implement a lazy-loading observer class

```typescript
// ~/utilities/lazy-loading.ts
export default class Observer {
  private static instance: IntersectionObserver
  private constructor() {
    Observer.instance = new IntersectionObserver(this.callback, this.optoins)
  }

  static getInstance() {
    if (!Observer.instance) new Observer()

    return Observer.instance
  }

  private callback: IntersectionObserverCallback = (entries, observer) => {
    Array.prototype.forEach.call(
      entries,
      async ({ isIntersecting, target }: IntersectionObserverEntry) => {
        if (isIntersecting) {
          observer.unobserve(target)
          const dataSrc = target.getAttribute('data-src')
          const arg = target.getAttribute('arg')

          if (!dataSrc)
            throw new Error('data-src is not found on this element!')

          switch (arg) {
            case 'background':
              const style = target.getAttribute('style') || ''
              target.setAttribute(
                'style',
                `${style}background-image:url(${dataSrc});background-position: center;background-size: 100% 100%;background-repeat: no-repeat;`
              )
              break
            default:
              target.setAttribute('src', dataSrc)
          }
        }
      }
    )
  }

  private optoins: IntersectionObserverInit = {
    root: null,
    rootMargin: '30px',
    threshold: [0]
  }
}
```

register vue directive

```typescript
// ~/plugins/lazy-loading.ts
import Vue from 'vue'
import Observer from '~/utilities/lazy-loading'

const observer = Observer.getInstance()
console.log('observer getinstance')

Vue.directive('lazy', {
  bind(el, binding) {
    el.setAttribute('arg', binding.arg || 'default')
    el.setAttribute('data-src', binding.value)
    observer.observe(el)
  },
  unbind(el) {
    observer.unobserve(el)
  }
})
```

### Register Plugins

register to `plugins` in `nuxt.config.ts`

```typescript
export default {
  plugins: [
    { src: '~/plugins/lazy-loading.ts', mode: 'client' }
  ]
}
```
