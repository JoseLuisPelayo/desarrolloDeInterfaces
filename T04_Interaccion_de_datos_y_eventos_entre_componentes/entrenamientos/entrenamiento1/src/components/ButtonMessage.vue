<template>
    <button @click="emitirEvento">Haz click aquí</button>
</template>
<script setup>
import { bus } from './eventBus';

let count = 0;

function emitirEvento() {
    count++;
    bus.dispatchEvent(new CustomEvent('botonclicado', {detail: { msg: 'el botón fue clikado', count}}))
}


</script>
<style>
    button {
        padding: 1rem .5rem;
        font-size: 2rem;
        background-color: aqua;
    }
</style>