<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, ref, nextTick } from "vue";
import { random } from 'gsap/gsap-core'

const advertBlock = ref(null);
const isVisible = ref(false);

function redirectToUrl() {
  location.href = 'https://brunner.top/';
}

const showAdvert = async () => {

  isVisible.value = true;
  await nextTick();

  gsap.to(advertBlock.value, {
    y: -40,
    x: 0,
    opacity: 1,
    duration: 2,
    ease: "elastic.out(1, 0.3)",
  });
};

onMounted(() => {
  setTimeout(() => {
    showAdvert();
  },  random(2500, 4000));
});
</script>

<template>
  <div
    class="advert-container button"
    ref="advertBlock"
    v-if="isVisible"
    @click="redirectToUrl"
  >
    See more of my Projects
  </div>
</template>

<style scoped>
.advert-container {
  position: fixed;
  bottom: 0;
  left: 30px;
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  border: 0.15em solid #000000;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.90rem;
  transition: 0.2s ease;
  opacity:0;
  &:hover{
    background-color: rgb(103, 253, 196);
  }
}


</style>
