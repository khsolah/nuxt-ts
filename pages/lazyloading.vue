<template>
  <div class="container flex flex-col justify-center items-center">
    <img
      v-for="item in 20"
      :key="item"
      v-lazy="imageUrl"
      class="mb-4 my-auto w-[200px] h-[200px]"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Lazyloading',
  data() {
    return {
      imageUrl:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    }
  }
})
</script>
