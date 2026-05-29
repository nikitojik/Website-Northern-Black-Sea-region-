<template>
  <main class="cities-index">
    <section class="cities-index-list">
      <div class="cities-index-container">
        <p class="cities-index-list__count">
          Показано {{ visibleCities.length }} из {{ cities.length }} городов
        </p>

        <div class="cities-index-list__grid">
          <article
            v-for="city in visibleCities"
            :key="city.id"
            class="cities-index-card"
            v-reveal
            @click="openCity(city)"
          >
            <div class="cities-index-card__image-wrap">
              <img
                :src="city.image"
                :alt="city.title"
                class="cities-index-card__image"
              >

              <span class="cities-index-card__period">
                {{ city.period || 'VII век до н.э.' }}
              </span>
            </div>

            <h2>{{ city.title }}</h2>
          </article>
        </div>

        <button
          v-if="!showAll && hiddenCount > 0"
          class="cities-index-list__more"
          type="button"
          @click="showAll = true"
        >
          <span class="cities-index-list__more-icon" aria-hidden="true"></span>
          <span>Показать еще ({{ hiddenCount }})</span>
        </button>

        <button
          v-else-if="showAll && hiddenCount > 0"
          class="cities-index-list__more"
          type="button"
          @click="showAll = false"
        >
          <span class="cities-index-list__more-icon cities-index-list__more-icon--minus" aria-hidden="true"></span>
          <span>Свернуть список</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { cities } from '../data/cities'

const router = useRouter()
const showAll = ref(false)
const initialCount = 6

const visibleCities = computed(() => {
  return showAll.value ? cities : cities.slice(0, initialCount)
})

const hiddenCount = computed(() => {
  return Math.max(cities.length - initialCount, 0)
})

function openCity(city) {
  router.push({
    name: 'city-detail',
    params: { id: city.id }
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;600&family=Inter:wght@400&display=swap');

.cities-index,
.cities-index *,
.cities-index *::before,
.cities-index *::after {
  box-sizing: border-box;
}

.cities-index {
  min-height: 100vh;
  background: #f4f3f0;
  color: #3a2e1f;
}

.cities-index-container {
  width: min(1272px, calc(100% - 160px));
  margin: 0 auto;
}

.cities-index-list {
  padding: 40px 0 68px;
  background: #f4f3f0;
}

.cities-index-list__count {
  margin: 0 0 76px;
  padding: 0;
  border: 0;
  font-family: Lora, Georgia, serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  color: #525252;
}

.cities-index-list__grid {
  display: grid;
  grid-template-columns: repeat(3, 402px);
  justify-content: center;
  gap: 56px 33px;
}

.cities-index-card {
  display: block;
  width: 402px;
  margin: 0;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  outline: 0;
  overflow: visible;
  color: #3a2e1f;
  cursor: pointer;
  transition: transform .24s ease;
}

.cities-index-card:hover {
  transform: translateY(-4px);
  background: transparent;
  border: 0;
  box-shadow: none;
}

.cities-index-card__image-wrap {
  position: relative;
  width: 402px;
  height: 268px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-radius: 36px;
  box-shadow: none;
}

.cities-index-card__image {
  display: block;
  width: 402px;
  height: 268px;
  margin: 0;
  padding: 0;
  object-fit: cover;
  object-position: center;
  border: 0;
  border-radius: 36px;
  box-shadow: none;
  outline: 0;
  transition: transform .35s ease, filter .35s ease;
}

.cities-index-card:hover .cities-index-card__image {
  transform: scale(1.045);
  filter: saturate(1.06) contrast(1.03);
}

.cities-index-card__period {
  position: absolute;
  left: 25px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  height: 25px;
  padding: 0 2px;
  background: rgba(236, 236, 236, .75);
  border: 0;
  border-radius: 5px;
  box-shadow: none;
  font-family: Inter, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
}

.cities-index-card h2 {
  width: calc(100% - 54px);
  margin: 6px 0 0 25px;
  padding: 0;
  border: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  color: #3a2e1f;
}

.cities-index-list__more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 213px;
  height: 45px;
  margin: 86px auto 0;
  padding: 0;
  background: #2a9d8e;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 5px;
  box-shadow: none;
  font-family: Lora, Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: #faf6ed;
  cursor: pointer;
  transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;
}

.cities-index-list__more:hover {
  background: #248b7e;
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(58, 46, 31, .16);
}

.cities-index-list__more-icon {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
}

.cities-index-list__more-icon::before,
.cities-index-list__more-icon::after {
  content: '';
  position: absolute;
  top: 10px;
  width: 10px;
  height: 2px;
  background: #faf6ed;
  border-radius: 2px;
}

.cities-index-list__more-icon::before {
  left: 3px;
  transform: rotate(45deg);
}

.cities-index-list__more-icon::after {
  right: 3px;
  transform: rotate(-45deg);
}

.cities-index-list__more-icon--minus::before {
  transform: rotate(-45deg);
}

.cities-index-list__more-icon--minus::after {
  transform: rotate(45deg);
}

@media (max-width: 1180px) {
  .cities-index-container {
    width: calc(100% - 80px);
  }

  .cities-index-list__grid {
    grid-template-columns: repeat(2, 402px);
  }
}

@media (max-width: 900px) {
  .cities-index-container {
    width: calc(100% - 32px);
  }

  .cities-index-list__grid {
    grid-template-columns: minmax(0, 402px);
  }
}

@media (max-width: 760px) {
  .cities-index-list {
    padding-top: 30px;
  }

  .cities-index-list__count {
    margin-bottom: 32px;
  }

  .cities-index-list__grid {
    gap: 40px;
  }

  .cities-index-card,
  .cities-index-card__image-wrap,
  .cities-index-card__image {
    width: 100%;
  }

  .cities-index-card__image-wrap,
  .cities-index-card__image {
    height: 240px;
    border-radius: 28px;
  }

  .cities-index-card h2 {
    width: auto;
    margin-left: 0;
    font-size: 26px;
    line-height: 32px;
  }

  .cities-index-card__period {
    left: 18px;
  }

  .cities-index-list__more {
    margin-top: 50px;
  }
}
</style>