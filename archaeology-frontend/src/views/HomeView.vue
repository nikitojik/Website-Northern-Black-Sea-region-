<template>
  <main class="home-page">
    <section class="home-hero">
      <div class="home-hero__inner">
        <p class="home-hero__kicker">АРХЕОЛОГИЯ</p>
        <h1>Северного Причерноморья</h1>
        <p class="home-hero__lead">
          Путешествие в мир древнегреческих колоний на берегах Понта Эвксинского.
          История, археология и научные открытия.
        </p>

        <img :src="heroMap" alt="Карта Северного Причерноморья" class="home-hero__map">

        <div class="home-hero__actions">
          <router-link :to="{ name: 'map' }" class="home-button home-button--primary">
            Открыть карту →
          </router-link>
          <router-link to="/cities" class="home-button home-button--secondary">
            Исследовать города
          </router-link>
        </div>
      </div>
    </section>

    <section class="home-features">
      <div class="home-container home-features__grid">
        <router-link
          v-for="(item, index) in features"
          :key="item.title"
          :to="item.to"
          class="home-feature"
          v-reveal="index * 90"
        >
          <span class="home-feature__icon-wrap">
            <img :src="item.icon" alt="" class="home-feature__icon">
          </span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </router-link>
      </div>
    </section>

    <section class="home-landmarks">
      <div class="home-container home-section-head" v-reveal>
        <h2>Ключевые памятники региона</h2>
        <router-link to="/cities">Все города →</router-link>
      </div>

      <div class="home-container home-landmarks__grid">
        <router-link
          v-for="(city, index) in featuredCities"
          :key="city.id"
          :to="{ name: 'city-detail', params: { id: city.id } }"
          class="home-landmark"
          v-reveal="index * 90"
        >
          <img :src="city.image" :alt="city.title" class="home-landmark__image">
          <h3>{{ city.title }}</h3>
        </router-link>
      </div>
    </section>

    <section class="home-about" v-reveal>
      <h2>О проекте</h2>
      <p>Информация о проекте</p>
      <router-link to="/history" class="home-button home-button--primary home-about__button">
        История исследований →
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { cities } from '../data/cities'
import heroMap from '../assets/hero-map.png'
import iconMap from '../assets/icon-map.png'
import iconCity from '../assets/icon-city.png'
import iconCompass from '../assets/icon-compass.png'
import iconHelmet from '../assets/icon-helmet.png'

const featuredCities = computed(() => {
  return cities.filter((city) => city.isMajor).slice(0, 4)
})

const features = [
  {
    icon: iconMap,
    title: 'Интерактивная карта',
    text: 'Исследуйте расположение античных городов на карте Северного Причерноморья',
    to: { name: 'map' }
  },
  {
    icon: iconCity,
    title: '19 античных городов',
    text: 'Подробная информация о крупнейших греческих колониях региона',
    to: { name: 'cities' }
  },
  {
    icon: iconCompass,
    title: 'История археологии',
    text: '250 лет изучения античных памятников Причерноморья',
    to: { name: 'history' }
  },
  {
    icon: iconHelmet,
    title: 'Экспедиции Эрмитажа',
    text: 'Современные археологические исследования ведущего музея России',
    to: { name: 'expeditions' }
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500&family=Inter:wght@400&display=swap');

.home-page {
  min-height: 100vh;
  background: #f5f1e8;
  color: #3a2e1f;
}

.home-container {
  width: min(1136px, calc(100% - 80px));
  margin: 0 auto;
}

.home-hero {
  padding: 84px 0 70px;
  background: #f5f1e8;
  border-bottom: 2px solid #c9a55c;
}

.home-hero__inner {
  width: min(1070px, calc(100% - 80px));
  margin: 0 auto;
  text-align: center;
}

.home-hero__kicker {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 68px;
  color: #3a2e1f;
}

.home-hero h1 {
  margin-top: -2px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 56px;
  font-weight: 500;
  line-height: 68px;
  color: #2a9d8e;
}

.home-hero__lead {
  max-width: 600px;
  margin: 19px auto 14px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #342b1b;
}

.home-hero__map {
  display: block;
  width: 100%;
  height: 476px;
  margin-top: 14px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
}

.home-hero__actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 74px;
}

.home-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  min-height: 50px;
  border-radius: 6px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
  transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(58, 46, 31, .14);
}

.home-button--primary {
  background: #2a9d8e;
  color: #ffffff;
}

.home-button--primary:hover {
  background: #248b7e;
}

.home-button--secondary {
  background: rgba(245, 233, 208, .85);
  color: #3a2e1f;
}

.home-features {
  min-height: 400px;
  padding: 77px 0 120px;
  background: #ffffff;
}

.home-features__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
}

.home-feature {
  min-height: 200px;
  padding: 22px 20px 18px;
  background: #faf6ed;
  border: 1px solid #e5c97a;
  border-radius: 12px;
  transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
}

.home-feature:hover {
  transform: translateY(-6px);
  border-color: #c9a55c;
  box-shadow: 0 16px 30px rgba(80, 59, 31, .13);
}

.home-feature__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
  background: rgba(42, 157, 142, .15);
  border-radius: 5px;
}

.home-feature__icon {
  width: 33px;
  height: 33px;
  object-fit: contain;
}

.home-feature h2 {
  margin-bottom: 8px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #3a2e1f;
}

.home-feature p {
  font-family: Lora, Georgia, serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #6b5a3a;
}

.home-landmarks {
  min-height: 360px;
  padding: 24px 0 75px;
  background: #f5f1e8;
  border-top: 2px solid #c9a55c;
  border-bottom: 2px solid #c9a55c;
}

.home-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.home-section-head h2 {
  max-width: 510px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  color: #3a2e1f;
}

.home-section-head a {
  margin-top: 16px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #3a2e1f;
  transition: color .2s ease, transform .2s ease;
}

.home-section-head a:hover {
  color: #2a9d8e;
  transform: translateX(3px);
}

.home-landmarks__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 47px;
}

.home-landmark {
  display: block;
  color: #000000;
}

.home-landmark__image {
  display: block;
  width: 100%;
  height: 149px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform .3s ease, box-shadow .3s ease;
}

.home-landmark:hover .home-landmark__image {
  transform: translateY(-4px);
  box-shadow: 0 14px 26px rgba(80, 59, 31, .16);
}

.home-landmark h3 {
  margin-top: 2px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: #000000;
}

.home-about {
  min-height: 450px;
  padding: 7px 0 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #ffffff;
}

.home-about h2 {
  margin-top: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  color: #3a2e1f;
}

.home-about p {
  margin-top: 8px;
  font-family: Lora, Georgia, serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  color: #6b5a3a;
}

.home-about__button {
  width: 278px;
  margin-top: auto;
  font-family: Inter, Arial, sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #faf6ed;
}

@media (max-width: 1120px) {
  .home-features__grid,
  .home-landmarks__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .home-container,
  .home-hero__inner {
    width: calc(100% - 32px);
  }

  .home-hero {
    padding-top: 52px;
  }

  .home-hero__kicker,
  .home-hero h1 {
    font-size: 42px;
    line-height: 48px;
  }

  .home-hero__map {
    height: 300px;
  }

  .home-hero__actions,
  .home-section-head {
    flex-direction: column;
    align-items: center;
  }

  .home-hero__actions {
    margin-top: 36px;
  }

  .home-section-head {
    text-align: center;
  }

  .home-section-head a {
    margin-top: 0;
  }
}

@media (max-width: 560px) {
  .home-features__grid,
  .home-landmarks__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .home-hero__kicker,
  .home-hero h1 {
    font-size: 34px;
    line-height: 40px;
  }

  .home-button {
    width: 100%;
  }
}
</style>