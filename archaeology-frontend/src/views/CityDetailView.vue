<template>
  <main>
    <section class="page-hero" v-reveal>
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--left">
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--right">

      <div class="container page-hero__inner">
        <div>
          <h1>{{ city.title }}</h1>
          <p>{{ city.content?.short || 'КРАТКОЕ ОПИСАНИЕ' }}</p>
        </div>
      </div>
    </section>

    <section class="detail-page container" v-reveal>
      <img :src="city.image" :alt="city.title" class="detail-page__image">

      <div class="detail-page__content">
        <div class="detail-page__meta">{{ city.greek }}</div>
        <h2>{{ city.title }}</h2>

        <RichText
          :blocks="city.content?.blocks || placeholderBlocks"
          :notes="city.content?.notes || {}"
        />

        <router-link to="/cities" class="btn btn--primary detail-page__button">
          ← К списку городов
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RichText from '../components/RichText.vue'
import placeholder from '../assets/placeholder.png'
import { cities } from '../data/cities'
import { placeholderCityContent } from '../content/cities/placeholderCity'

const route = useRoute()
const placeholderBlocks = placeholderCityContent.blocks

const city = computed(() => {
  const id = Number(route.params.id)

  return cities.find((item) => item.id === id) || {
    title: 'Город',
    greek: 'В разработке',
    image: placeholder,
    content: placeholderCityContent
  }
})
</script>