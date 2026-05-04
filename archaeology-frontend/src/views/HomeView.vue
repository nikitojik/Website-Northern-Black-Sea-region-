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
          <router-link :to="{ name: 'map' }" class="btn btn--primary">
            Открыть карту →
          </router-link>
          <router-link to="/cities" class="btn btn--light">Исследовать города</router-link>
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
        <router-link to="/cities">Все города →</router-link>
      </div>

      <div class="container landmarks__grid">
        <CityCard
          v-for="(city, index) in featuredCities"
          :key="city.id"
          :city="city"
          link-to-detail
          v-reveal="index * 90"
        />
      </div>
    </section>

    <section class="about" v-reveal>
      <h2>О проекте</h2>
      <p>Информация о проекте</p>
      <router-link to="/history" class="btn btn--primary">
        История исследований →
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import CityCard from '../components/CityCard.vue'
import { cities } from '../data/cities'
import iconMap from '../assets/icon-map.png'
import iconCity from '../assets/icon-city.png'
import iconCompass from '../assets/icon-compass.png'
import iconHelmet from '../assets/icon-helmet.png'

const featuredCities = computed(() => {
  return cities.filter((city) => !city.isPlaceholder)
})

const features = [
  {
    icon: iconMap,
    title: 'Интерактивная карта',
    text: 'Исследуйте расположение античных городов на карте Северного Причерноморья.',
    to: { name: 'map' }
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
