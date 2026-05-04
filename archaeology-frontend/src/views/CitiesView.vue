<template>
  <main>
    <section class="cities-hero" v-reveal>
      <img src="../assets/corner.png" alt="" class="cities-hero__corner cities-hero__corner--left">
      <img src="../assets/corner.png" alt="" class="cities-hero__corner cities-hero__corner--right">

      <div class="container cities-hero__inner">
        <div>
          <h1>Античные города</h1>
          <p>Древнегреческие колонии на берегах Чёрного моря — уникальные памятники античной цивилизации, сохранившие следы великой культуры на территории Северного Причерноморья и Крыма.</p>
        </div>

        <router-link
          :to="{ name: 'map' }"
          class="btn btn--primary cities-hero__button"
        >
          Смотреть на карте
        </router-link>
      </div>
    </section>

    <section class="cities-page container">
      <div class="cities-page__count">
        Показано {{ visibleCities.length }} из {{ cities.length }} городов
      </div>

      <img src="../assets/divider.png" alt="" class="cities-page__divider">

      <div class="cities-page__grid">
        <CityCard
          v-for="city in visibleCities"
          :key="city.id"
          :city="city"
          link-to-detail
          v-reveal
        />
      </div>

      <button
        v-if="!showAll && hiddenCount > 0"
        class="btn btn--primary cities-page__more"
        type="button"
        @click="showAll = true"
      >
        Показать еще ({{ hiddenCount }})
      </button>

      <button
        v-else-if="showAll && hiddenCount > 0"
        class="btn btn--primary cities-page__more"
        type="button"
        @click="showAll = false"
      >
        Свернуть список
      </button>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import CityCard from '../components/CityCard.vue'
import { cities } from '../data/cities'

const showAll = ref(false)
const initialCount = 6

const visibleCities = computed(() => {
  return showAll.value ? cities : cities.slice(0, initialCount)
})

const hiddenCount = computed(() => {
  return Math.max(cities.length - initialCount, 0)
})
</script>
