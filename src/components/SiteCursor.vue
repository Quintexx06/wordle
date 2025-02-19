<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, ref, nextTick } from "vue";

const cursor = ref(null);

onMounted(() => {
  nextTick(() => {
    if (!cursor.value) return;

    window.addEventListener("mousemove", (e) => {
      gsap.to(cursor.value, {
        x: e.clientX + 20,
        y: e.clientY - 10,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    const buttons = document.querySelectorAll(".button");
    buttons.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor.value, { scale: 1.7 , border: '1px solid black', background: 'rgb(40,255,183)', duration: 0.2 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor.value, { scale: 1, border: '1px solid transparent',  background: 'rgb(103, 195, 253)', duration: 0.2 });
      });
    });


  });
});
</script>

<template>
  <div class="custom-cursor" ref="cursor"></div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  background: rgb(103, 195, 253);
  border: 1px solid transparent;
  opacity: 0.6;
  border-radius: 50%;
  z-index: 999;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
</style>
