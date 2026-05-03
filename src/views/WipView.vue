<template>
  <main class="wip">
    <div class="container wip__inner" v-reveal>
      <p class="wip__label">Раздел в разработке</p>
      <h1>{{ pageTitle }}</h1>
      <p>Work in progress</p>
      <button class="btn btn--primary" @click="goBack">Назад</button>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageTitle = computed(() => route.query.title || 'Раздел в разработке')

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
