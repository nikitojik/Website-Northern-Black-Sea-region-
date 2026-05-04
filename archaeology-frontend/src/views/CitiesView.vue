<template>
  <main>
    <section class="cities-hero" v-reveal>
      <img src="../assets/corner.png" alt="" class="cities-hero__corner cities-hero__corner--left">
      <img src="../assets/corner.png" alt="" class="cities-hero__corner cities-hero__corner--right">

      <div class="container cities-hero__inner">
        <div>
          <h1>Античные города</h1>
          <p>КРАТКОЕ ОПИСАНИЕ</p>
        </div>

        <router-link
          :to="{ name: 'wip', query: { title: 'Карта городов' } }"
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

      <TransitionGroup name="city-list" tag="div" class="cities-page__grid">
        <CityCard
          v-for="city in visibleCities"
          :key="city.id"
          :city="city"
          v-reveal
          @open="openCity"
        />
      </TransitionGroup>

      <button
        v-if="!showAll && hiddenCount > 0"
        class="btn btn--primary cities-page__more"
        type="button"
        @click="showAll = true"
      >
        ⌄ Показать еще ({{ hiddenCount }})
      </button>

      <button
        v-else-if="showAll && hiddenCount > 0"
        class="btn btn--primary cities-page__more"
        type="button"
        @click="showAll = false"
      >
        ⌃ Свернуть список
      </button>
    </section>

    <Teleport to="body">
      <Transition name="city-modal">
        <div
          v-if="selectedCity"
          class="city-modal"
          @click.self="closeCity"
        >
          <div class="city-modal__window">
            <button
              class="city-modal__close"
              type="button"
              aria-label="Закрыть"
              @click="closeCity"
            >
              ×
            </button>

            <img
              :src="selectedCity.image"
              :alt="selectedCity.title"
              class="city-modal__image"
            >

            <div class="city-modal__content">
              <div class="city-modal__head">
                <h2>{{ selectedCity.title }}</h2>
                <span>{{ selectedCity.greek }}</span>
              </div>

              <p>{{ selectedCity.content?.short || 'КРАТКОЕ ОПИСАНИЕ' }}</p>

              <router-link
                :to="{ name: 'city-detail', params: { id: selectedCity.id } }"
                class="btn btn--primary city-modal__button"
                @click="closeCity"
              >
                Подробнее
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import CityCard from '../components/CityCard.vue'
import { cities } from '../data/cities'

const showAll = ref(false)
const selectedCity = ref(null)
const initialCount = 6

const visibleCities = computed(() => {
  return showAll.value ? cities : cities.slice(0, initialCount)
})

const hiddenCount = computed(() => {
  return Math.max(cities.length - initialCount, 0)
})

function openCity(city) {
  selectedCity.value = city
}

function closeCity() {
  selectedCity.value = null
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeCity()
  }
}

watch(selectedCity, (city) => {
  if (city) {
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleEscape)
  } else {
    document.body.classList.remove('modal-open')
    window.removeEventListener('keydown', handleEscape)
  }
})

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', handleEscape)
})
</script>