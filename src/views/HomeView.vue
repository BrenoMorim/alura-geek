<template>
  <section class="home">
    <HomeBanner/>
    <HomeProdutos/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeBanner from '@/components/Home/HomeBanner.vue';
import HomeProdutos from '@/components/Home/HomeProdutos.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeBanner,
    HomeProdutos
},
});
</script>
