<template>
  <main>
    <section class="page-hero" v-reveal>
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--left">
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--right">

      <div class="container page-hero__inner">
        <div>
          <h1>{{ item.title }}</h1>
          <p>{{ item.short }}</p>
        </div>
      </div>
    </section>

    <section class="detail-page container" v-reveal>
      <img :src="item.image" :alt="item.title" class="detail-page__image">

      <div class="detail-page__content">
        <div class="detail-page__meta">{{ item.period }}</div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.full }}</p>

        <router-link :to="backLink" class="btn btn--primary detail-page__button">
          ← Назад к списку
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import placeholder from '../assets/placeholder.png'
import { expeditionItems } from '../data/expeditions'
import { historyItems } from '../data/history'

const route = useRoute()

const isExpedition = computed(() => route.name === 'expedition-detail')
const collection = computed(() => (isExpedition.value ? expeditionItems : historyItems))
const backLink = computed(() => (isExpedition.value ? '/expeditions' : '/history'))

const item = computed(() => {
  const id = Number(route.params.id)

  return collection.value.find((entry) => entry.id === id) || {
    title: 'Placeholder',
    period: 'Placeholder',
    image: placeholder,
    short: 'КРАТКОЕ ОПИСАНИЕ',
    full: 'ПОЛНОЕ ОПИСАНИЕ'
  }
})
</script>