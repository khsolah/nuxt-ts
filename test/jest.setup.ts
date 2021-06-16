import Vue from 'vue'
import { config } from '@vue/test-utils'

Vue.config.silent = true

config.stubs.nuxt = { template: '<div />' }
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
config.stubs['nuxt-view'] = { template: '<span><slot /></span>' }
