<template>
    <div>
        <p>{{ msg }}</p>
    </div>
</template>


<script setup>

import { onMounted, ref } from 'vue';
import { bus } from './eventBus';

    let msg = ref('aqui va el msg');

    onMounted(() => {
        bus.addEventListener('botonclicado', (e) => {
            console.log(e.detail.msg);
            msg.value = `${e.detail.msg.concat(" ").concat(e.detail.count).concat(" veces")}`;
        })
    })


</script>
<style scoped>
    p {
    font-size: 2rem;
    }
</style>