<template>
  <CabecalhoPadrao/>
  <router-view/>
  <FooterPadrao/>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CabecalhoPadrao from "./components/CabecalhoPadrao.vue";
import FooterPadrao from "./components/FooterPadrao.vue";

export default defineComponent({
  name: 'App',
  components: {
    CabecalhoPadrao,
    FooterPadrao
  }
})
</script>

<style scoped>
@import url('@/assets/css/reset.css');
@import url('@/assets/css/_variaveis.css');

#app {
  background-color: #FEFEFE;
}
#app * {
  font-family: var(--fonte-principal);
}
</style>
