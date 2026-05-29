<template>
  <main class="map-page-redesign">
    <section class="map-page-redesign__hero">
      <div class="map-page-redesign__hero-inner">
        <h1>
          <span class="map-page-redesign__hero-main">КАРТА</span>
          <span class="map-page-redesign__hero-accent">Северного Причерноморья</span>
        </h1>

        <p>
          Исследуйте расположение античных греческих городов на побережье Черного моря.
          Нажмите на маркер, чтобы узнать больше о городе.
        </p>
      </div>
    </section>

    <section ref="mapSectionRef" class="map-page-redesign__map-section">
      <InteractiveMap ref="interactiveMapRef" />

      <div class="map-page-redesign__legend-wrap">
        <div class="map-page-redesign__legend">
          <div class="map-page-redesign__legend-item">
            <span class="map-page-redesign__legend-icon map-page-redesign__legend-icon--red" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4 19h16" />
                <path d="M6 16h12" />
                <path d="M8 16V9" />
                <path d="M12 16V9" />
                <path d="M16 16V9" />
                <path d="M5 9h14" />
                <path d="M12 4 5 9h14L12 4Z" />
              </svg>
            </span>
            <span>Крупные центры</span>
          </div>

          <div class="map-page-redesign__legend-item">
            <span class="map-page-redesign__legend-icon map-page-redesign__legend-icon--blue" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M9 4h6" />
                <path d="M10 4v5l-5 8a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8V4" />
                <path d="M8 15h8" />
              </svg>
            </span>
            <span>Исследования Эрмитажа</span>
          </div>

          <div class="map-page-redesign__legend-item">
            <span class="map-page-redesign__legend-icon map-page-redesign__legend-icon--gold" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4 19h16" />
                <path d="M6 19v-7l6-5 6 5v7" />
                <path d="M9 19v-5h6v5" />
                <path d="M12 7V4" />
                <path d="M10 4h4" />
              </svg>
            </span>
            <span>Прочие поселения</span>
          </div>

          <div class="map-page-redesign__legend-item">
            <span class="map-page-redesign__legend-icon map-page-redesign__legend-icon--green" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4 19h16" />
                <path d="M5 9h14" />
                <path d="M7 9v10" />
                <path d="M11 9v10" />
                <path d="M15 9v10" />
                <path d="M19 9v10" />
                <path d="M12 4 4 9h16L12 4Z" />
              </svg>
            </span>
            <span>Совместный проект с Государственным Эрмитажем</span>
          </div>
        </div>
      </div>
    </section>

    <section class="map-page-redesign__cities">
      <div class="map-page-redesign__container">
        <h2>Все города на карте</h2>

        <div class="map-page-redesign__grid">
          <article
            v-for="city in visibleCities"
            :key="city.id"
            class="map-page-redesign__city-card"
            @click="focusCity(city)"
          >
            <div class="map-page-redesign__city-icon" aria-hidden="true">
              <svg
                class="map-page-redesign__city-pin"
                viewBox="0 0 24 24"
                focusable="false"
              >
                <path
                  d="M12 21s7-6.18 7-12a7 7 0 0 0-14 0c0 5.82 7 12 7 12Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="9"
                  r="2.6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
            </div>

            <div class="map-page-redesign__city-info">
              <h3>{{ city.title }}</h3>
              <p>{{ getLocation(city) }}</p>
              <small>Основан: {{ city.period || 'VII век до н.э.' }}</small>
            </div>
          </article>
        </div>

        <button
          v-if="!showAll && hiddenCount > 0"
          class="map-page-redesign__more-button"
          type="button"
          @click="showAll = true"
        >
          <span class="map-page-redesign__more-button-icon" aria-hidden="true"></span>
          <span>Показать еще ({{ hiddenCount }})</span>
        </button>

        <button
          v-else-if="showAll && hiddenCount > 0"
          class="map-page-redesign__more-button"
          type="button"
          @click="showAll = false"
        >
          <span class="map-page-redesign__more-button-icon map-page-redesign__more-button-icon--up" aria-hidden="true"></span>
          <span>Свернуть список</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import InteractiveMap from '../components/InteractiveMap.vue'
import { cities } from '../data/cities'

const showAll = ref(false)
const initialCount = 8
const interactiveMapRef = ref(null)
const mapSectionRef = ref(null)

const locations = {
  pantikapey: 'Керчь, Крым',
  olbia: 'Николаевская область',
  chersonesus: 'Севастополь, Крым',
  phanagoria: 'Тамань, Краснодарский край',
  borisfen: 'о. Березань',
  germonassa: 'Тамань, Краснодарский край',
  gorgippia: 'Анапа, Краснодарский край',
  'kalos-limen': 'Черноморское, Крым',
  kerkinitida: 'Евпатория, Крым',
  kimmerik: 'Керченский полуостров',
  kitey: 'Керченский полуостров',
  mirmekiy: 'Керчь, Крым',
  'neapol-skit': 'Симферополь, Крым',
  nikoniy: 'Одесская область',
  nimfey: 'Керченский полуостров',
  tanais: 'Ростовская область',
  tira: 'Белгород-Днестровский',
  tiritaka: 'Керчь, Крым',
  feodosiya: 'Феодосия, Крым'
}

const visibleCities = computed(() => {
  return showAll.value ? cities : cities.slice(0, initialCount)
})

const hiddenCount = computed(() => {
  return Math.max(cities.length - initialCount, 0)
})

function getLocation(city) {
  return city.location || locations[city.slug] || 'Место в настоящее время'
}

function focusCity(city) {
  mapSectionRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  setTimeout(() => {
    interactiveMapRef.value?.focusCityById(city.id)
  }, 350)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap');

.map-page-redesign,
.map-page-redesign *,
.map-page-redesign *::before,
.map-page-redesign *::after {
  box-sizing: border-box;
}

.map-page-redesign {
  min-height: 100vh;
  background: #f5f1e8;
  color: #3a2e1f;
}

.map-page-redesign__container {
  width: min(1160px, calc(100% - 160px));
  margin: 0 auto;
}

.map-page-redesign__hero {
  min-height: 250px;
  padding: 23px 0 34px;
  background: #f5f1e8;
  border-bottom: 2px solid #c9a55c;
}

.map-page-redesign__hero-inner {
  width: min(692px, calc(100% - 40px));
  margin: 0 auto;
  text-align: center;
}

.map-page-redesign__hero h1 {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.map-page-redesign__hero h1 span {
  display: block;
}

.map-page-redesign__hero-main {
  color: #3a2e1f;
}

.map-page-redesign__hero-accent {
  color: #2a9d8e;
}

.map-page-redesign__hero p {
  margin: 18px auto 0;
  font-family: Lora, Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  color: #6b5a3a;
}

.map-page-redesign__map-section {
  background: #f5f1e8;
  border-bottom: 2px solid #c9a55c;
  box-shadow: 0 4px 4px rgba(0, 0, 0, .18);
}

.map-page-redesign__legend-wrap {
  min-height: 65px;
  padding: 4px 22px;
  background: #f5f1e8;
}

.map-page-redesign__legend {
  width: min(1395px, 100%);
  min-height: 57px;
  margin: 0 auto;
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 34px;
  background: rgba(250, 246, 237, .78);
  border-radius: 6px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #6b5a3a;
}

.map-page-redesign__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.map-page-redesign__legend-icon {
  display: inline-flex;
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.map-page-redesign__legend-icon svg {
  display: block;
  width: 18px;
  height: 18px;
}

.map-page-redesign__legend-icon svg path,
.map-page-redesign__legend-icon svg circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.map-page-redesign__legend-icon--red {
  background: rgba(190, 74, 72, .14);
  color: #be4a48;
}

.map-page-redesign__legend-icon--blue {
  background: rgba(42, 157, 142, .16);
  color: #2a9d8e;
}

.map-page-redesign__legend-icon--gold {
  background: rgba(201, 165, 92, .18);
  color: #c9a55c;
}

.map-page-redesign__legend-icon--green {
  background: rgba(78, 145, 94, .16);
  color: #4e915e;
}

.map-page-redesign__cities {
  min-height: 425px;
  padding: 14px 0 31px;
  background: #ffffff;
  border-bottom: 2px solid #c9a55c;
}

.map-page-redesign__cities h2 {
  margin: 0 0 47px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  color: #3a2e1f;
}

.map-page-redesign__grid {
  display: grid;
  grid-template-columns: repeat(4, 275px);
  gap: 20px;
}

.map-page-redesign__city-card {
  display: grid;
  grid-template-columns: 35px minmax(0, 1fr);
  gap: 12px;
  width: 275px;
  min-height: 100px;
  padding: 15px 14px 12px 18px;
  background: #faf6ed;
  border: 1px solid #e5c97a;
  border-radius: 12px;
  cursor: pointer;
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}

.map-page-redesign__city-card:hover {
  transform: translateY(-3px);
  border-color: #c9a55c;
  box-shadow: 0 12px 22px rgba(80, 59, 31, .13);
}

.map-page-redesign__city-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: rgba(0, 96, 174, .15);
  border-radius: 25px;
  color: #0b86d1;
}

.map-page-redesign__city-pin {
  display: block;
  width: 22px;
  height: 22px;
}

.map-page-redesign__city-info {
  min-width: 0;
}

.map-page-redesign__city-info h3 {
  margin: -2px 0 3px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #3a2e1f;
}

.map-page-redesign__city-info p {
  margin: 0 0 4px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  line-height: 20px;
  color: #6b5a3a;
  white-space: normal;
  overflow-wrap: anywhere;
}

.map-page-redesign__city-info small {
  display: block;
  font-family: Lora, Georgia, serif;
  font-size: 12px;
  line-height: 15px;
  color: #6b5a3a;
  white-space: nowrap;
}

.map-page-redesign__more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 213px;
  height: 45px;
  margin: 29px auto 0;
  padding: 0;
  background: #2a9d8e;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 5px;
  font-family: Lora, Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: #faf6ed;
  cursor: pointer;
  transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;
}

.map-page-redesign__more-button:hover {
  background: #248b7e;
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(58, 46, 31, .16);
}

.map-page-redesign__more-button-icon {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
}

.map-page-redesign__more-button-icon::before,
.map-page-redesign__more-button-icon::after {
  content: '';
  position: absolute;
  top: 10px;
  width: 10px;
  height: 2px;
  background: #faf6ed;
  border-radius: 2px;
}

.map-page-redesign__more-button-icon::before {
  left: 3px;
  transform: rotate(45deg);
}

.map-page-redesign__more-button-icon::after {
  right: 3px;
  transform: rotate(-45deg);
}

.map-page-redesign__more-button-icon--up::before {
  transform: rotate(-45deg);
}

.map-page-redesign__more-button-icon--up::after {
  transform: rotate(45deg);
}

@media (max-width: 1240px) {
  .map-page-redesign__container {
    width: calc(100% - 80px);
  }

  .map-page-redesign__grid {
    grid-template-columns: repeat(3, 275px);
    justify-content: center;
  }

  .map-page-redesign__legend {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 12px 24px;
  }
}

@media (max-width: 920px) {
  .map-page-redesign__container {
    width: calc(100% - 32px);
  }

  .map-page-redesign__grid {
    grid-template-columns: repeat(2, 275px);
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .map-page-redesign__hero {
    min-height: auto;
    padding: 36px 0 42px;
  }

  .map-page-redesign__hero h1 {
    font-size: 34px;
    line-height: 40px;
  }

  .map-page-redesign__hero p {
    font-size: 17px;
    line-height: 24px;
  }

  .map-page-redesign__cities h2 {
    margin-bottom: 28px;
    text-align: center;
  }

  .map-page-redesign__grid {
    grid-template-columns: minmax(0, 275px);
  }

  .map-page-redesign__legend {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>