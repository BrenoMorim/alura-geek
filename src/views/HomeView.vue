<template>
  <section class="home">
    <HomeCabecalho/>
    <HomeBanner/>
    <HomeProdutos/>
    <HomeFooter/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeCabecalho from '@/components/HomeCabecalho.vue';
import HomeBanner from '@/components/HomeBanner.vue';
import HomeProdutos from '@/components/HomeProdutos.vue';
import HomeFooter from '@/components/HomeFooter.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeCabecalho,
    HomeBanner,
    HomeProdutos,
    HomeFooter
},
});
</script>
