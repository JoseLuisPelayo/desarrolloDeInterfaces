<script setup>
import ButtonMessage from './components/ButtonMessage.vue';
import TextShower from './components/TextShower.vue';
</script>

<template>
  <main>
    <ButtonMessage/>
    <TextShower/>
  </main>
</template>

<style scoped>
main{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
