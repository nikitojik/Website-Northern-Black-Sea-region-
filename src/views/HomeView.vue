<template>
  <main>
    <section class="hero">
      <img src="../assets/hero-map.png" alt="" class="hero__map">
      <div class="hero__overlay"></div>

      <div class="hero__content">
        <div class="hero__kicker">АРХЕОЛОГИЯ</div>
        <h1>Северного Причерноморья</h1>
        <p>Путешествие в мир древнегреческих колоний на берегах Понта Эвксинского. История, археология и античное наследие.</p>

        <div class="hero__actions">
          <router-link :to="{ name: 'wip', query: { title: 'Карта' } }" class="btn btn--primary">
            Открыть карту →
          </router-link>

          <router-link :to="{ name: 'cities' }" class="btn btn--light">
            Исследовать города
          </router-link>
        </div>
      </div>
    </section>

    <section class="features container">
      <router-link
        v-for="(item, index) in features"
        :key="item.title"
        :to="item.to"
        class="feature"
        v-reveal="index * 90"
      >
        <img :src="item.icon" alt="" class="feature__icon">
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
      </router-link>
    </section>

    <section class="landmarks" v-reveal>
      <div class="container section-head">
        <div>
          <h2>Ключевые памятники региона</h2>
          <p>Крупнейшие центры античной цивилизации на берегах Черного моря</p>
        </div>

        <router-link :to="{ name: 'cities' }">
          Все города →
        </router-link>
      </div>

      <div class="container landmarks-carousel">
        <button
          class="carousel-button"
          type="button"
          aria-label="Предыдущий город"
          :disabled="!canGoPrev"
          @click="prevCity"
        >
          ‹
        </button>

        <div class="landmarks-carousel__viewport">
          <div
            class="landmarks-carousel__track"
            :style="{ transform: `translateX(-${carouselOffset}%)` }"
          >
            <div
              v-for="city in cities"
              :key="city.id"
              class="landmarks-carousel__slide"
            >
              <CityCard
                :city="city"
                link-to-detail
              />
            </div>
          </div>
        </div>

        <button
          class="carousel-button"
          type="button"
          aria-label="Следующий город"
          :disabled="!canGoNext"
          @click="nextCity"
        >
          ›
        </button>
      </div>
    </section>

    <section class="about" v-reveal>
      <h2>О проекте</h2>
      <p>Информация о проекте</p>

      <router-link :to="{ name: 'history' }" class="btn btn--primary">
        История исследований →
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import CityCard from '../components/CityCard.vue'
import { cities } from '../data/cities'
import iconMap from '../assets/icon-map.png'
import iconCity from '../assets/icon-city.png'
import iconCompass from '../assets/icon-compass.png'
import iconHelmet from '../assets/icon-helmet.png'

const currentSlide = ref(0)
const visibleSlides = 4

const maxSlide = computed(() => {
  return Math.max(cities.length - visibleSlides, 0)
})

const canGoPrev = computed(() => {
  return currentSlide.value > 0
})

const canGoNext = computed(() => {
  return currentSlide.value < maxSlide.value
})

const carouselOffset = computed(() => {
  return currentSlide.value * (100 / visibleSlides)
})

function prevCity() {
  currentSlide.value = Math.max(currentSlide.value - 1, 0)
}

function nextCity() {
  currentSlide.value = Math.min(currentSlide.value + 1, maxSlide.value)
}

const features = [
  {
    icon: iconMap,
    title: 'Интерактивная карта',
    text: 'Исследуйте расположение античных городов на карте Северного Причерноморья.',
    to: { name: 'wip', query: { title: 'Карта' } }
  },
  {
    icon: iconCity,
    title: 'Античные города',
    text: 'Подробная информация о крупнейших греческих колониях региона.',
    to: { name: 'cities' }
  },
  {
    icon: iconCompass,
    title: 'История региона',
    text: '250 лет изучения античных памятников Причерноморья.',
    to: { name: 'history' }
  },
  {
    icon: iconHelmet,
    title: 'Экспедиции Эрмитажа',
    text: 'Современные археологические исследования ведущего музея России.',
    to: { name: 'expeditions' }
  }
]
</script>