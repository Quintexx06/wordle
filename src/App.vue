<script lang="ts">
import { defineComponent } from 'vue'
import SiteCursor from '@/components/SiteCursor.vue'

export default defineComponent({
  components: { SiteCursor },
})
</script>

<template>
  <SiteCursor />
  <RouterView />
</template>

<style scoped></style>
