<template>
    <router-link class="logo-container" :to="{name: 'home'}">
        <img src="../assets/img/Logo.png" class="logo" alt="Logo da Alura Geek"/>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'LogoPadrao'
})
</script>

<style scoped>
.logo {
    transition: 1s all;
}
.logo:active {
    transform: scale(1.2);
}
</style>