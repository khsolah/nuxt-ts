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
