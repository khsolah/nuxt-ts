<template>
  <div
    class="
      container
      absolute
      top-0
      left-0
      right-0
      bottom-0
      flex
      justify-center
      items-center
    "
  >
    <div>
      <Logo />
      <h1 class="title text-center text-size-[40px] leading-normal">NUXT.TS</h1>
      <div class="links">
        <nuxt-link
          :to="{ name: 'middleware' }"
          rel="noopener noreferrer"
          class="button--green"
        >
          Middleware
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'lazyloading' }"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Lazyloading
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
