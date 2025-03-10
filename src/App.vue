<script lang="ts">
import { defineComponent } from 'vue'
import SiteCursor from '@/components/SiteCursor.vue'

//Update Git
export default defineComponent({
  components: { SiteCursor },
})
</script>

<template>

  <RouterView />
  <SiteCursor />
</template>

<style scoped></style>
