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
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
