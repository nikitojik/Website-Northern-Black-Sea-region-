<template>
  <main class="expeditions-page-redesign">
    <section class="expeditions-page-redesign__hero">
      <div class="expeditions-page-redesign__hero-inner">
        <h1>
          <span class="expeditions-page-redesign__hero-main">ЭКСПЕДИЦИИ ЭРМИТАЖА</span>
          <span class="expeditions-page-redesign__hero-accent">Северного Причерноморья</span>
        </h1>

        <p>
          Экспедиции и археологические исследования античных городов
          Северного Причерноморья и Крыма.
        </p>
      </div>
    </section>

    <section class="expeditions-page-redesign__content">
      <div class="expeditions-page-redesign__container">
        <div class="expeditions-page-redesign__grid">
          <article
            v-for="item in visibleExpeditions"
            :key="item.id"
            class="expeditions-page-redesign__card"
            v-reveal
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="expeditions-page-redesign__card-image"
            >

            <div
              v-else
              class="expeditions-page-redesign__card-image expeditions-page-redesign__card-image--empty"
              aria-hidden="true"
            ></div>

            <div class="expeditions-page-redesign__card-body">
              <p class="expeditions-page-redesign__card-period">
                {{ item.period }}
              </p>

              <h2>{{ item.title }}</h2>

              <p class="expeditions-page-redesign__card-text">
                {{ item.short }}
              </p>

              <router-link
                :to="{ name: 'expedition-detail', params: { id: item.id } }"
                class="expeditions-page-redesign__card-link"
              >
                Подробнее →
              </router-link>
            </div>
          </article>
        </div>

        <button
          v-if="!showAll && hiddenCount > 0"
          class="expeditions-page-redesign__more-button"
          type="button"
          @click="showAll = true"
        >
          <span class="expeditions-page-redesign__more-button-icon" aria-hidden="true"></span>
          <span>Показать еще ({{ hiddenCount }})</span>
        </button>

        <button
          v-else-if="showAll && hiddenCount > 0"
          class="expeditions-page-redesign__more-button"
          type="button"
          @click="showAll = false"
        >
          <span class="expeditions-page-redesign__more-button-icon expeditions-page-redesign__more-button-icon--up" aria-hidden="true"></span>
          <span>Свернуть список</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { expeditionItems } from '../data/expeditions'

const showAll = ref(false)
const initialCount = 6

const visibleExpeditions = computed(() => {
  return showAll.value ? expeditionItems : expeditionItems.slice(0, initialCount)
})

const hiddenCount = computed(() => {
  return Math.max(expeditionItems.length - initialCount, 0)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap');

.expeditions-page-redesign,
.expeditions-page-redesign *,
.expeditions-page-redesign *::before,
.expeditions-page-redesign *::after {
  box-sizing: border-box;
}

.expeditions-page-redesign {
  min-height: 100vh;
  background: #ffffff;
  color: #3a2e1f;
}

.expeditions-page-redesign__container {
  width: min(1278px, calc(100% - 162px));
  margin: 0 auto;
}

.expeditions-page-redesign__hero {
  min-height: 250px;
  padding: 23px 0 34px;
  background: #f5f1e8;
  border-bottom: 2px solid #c9a55c;
}

.expeditions-page-redesign__hero-inner {
  width: min(692px, calc(100% - 40px));
  margin: 0 auto;
  text-align: center;
}

.expeditions-page-redesign__hero h1 {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.expeditions-page-redesign__hero h1 span {
  display: block;
}

.expeditions-page-redesign__hero-main {
  color: #3a2e1f;
}

.expeditions-page-redesign__hero-accent {
  color: #2a9d8e;
}

.expeditions-page-redesign__hero p {
  margin: 18px auto 0;
  font-family: Lora, Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  color: #6b5a3a;
}

.expeditions-page-redesign__content {
  min-height: 1284px;
  padding: 82px 0 54px;
  background: #ffffff;
}

.expeditions-page-redesign__grid {
  display: grid;
  grid-template-columns: repeat(3, 405px);
  gap: 36px 31px;
  align-items: start;
  justify-content: center;
}

.expeditions-page-redesign__card {
  display: flex;
  flex-direction: column;
  width: 405px;
  height: 500px;
  overflow: hidden;
  background: #faf6ed;
  border: 1px solid #e5c97a;
  border-radius: 12px;
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}

.expeditions-page-redesign__card:hover {
  transform: translateY(-4px);
  border-color: #c9a55c;
  box-shadow: 0 14px 28px rgba(80, 59, 31, .13);
}

.expeditions-page-redesign__card-image {
  display: block;
  width: 100%;
  height: 190px;
  flex: 0 0 190px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px 12px 0 0;
}

.expeditions-page-redesign__card-image--empty {
  background: #faf6ed;
}

.expeditions-page-redesign__card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 20px 24px 22px;
}

.expeditions-page-redesign__card-period {
  margin: 0 0 10px;
  font-family: Lora, Georgia, serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #6b5a3a;
}

.expeditions-page-redesign__card h2 {
  margin: 0 0 12px;
  overflow: visible;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 31px;
  color: #3a2e1f;
}

.expeditions-page-redesign__card-text {
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #6b5a3a;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.expeditions-page-redesign__card-link {
  display: inline-flex;
  align-self: flex-start;
  margin-top: auto;
  padding-top: 14px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #2a9d8e;
  transition: color .2s ease, transform .2s ease;
}

.expeditions-page-redesign__card-link:hover {
  color: #248b7e;
  transform: translateX(3px);
}

.expeditions-page-redesign__more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 213px;
  height: 45px;
  margin: 66px auto 0;
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

.expeditions-page-redesign__more-button:hover {
  background: #248b7e;
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(58, 46, 31, .16);
}

.expeditions-page-redesign__more-button-icon {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
}

.expeditions-page-redesign__more-button-icon::before,
.expeditions-page-redesign__more-button-icon::after {
  content: '';
  position: absolute;
  top: 10px;
  width: 10px;
  height: 2px;
  background: #faf6ed;
  border-radius: 2px;
}

.expeditions-page-redesign__more-button-icon::before {
  left: 3px;
  transform: rotate(45deg);
}

.expeditions-page-redesign__more-button-icon::after {
  right: 3px;
  transform: rotate(-45deg);
}

.expeditions-page-redesign__more-button-icon--up::before {
  transform: rotate(-45deg);
}

.expeditions-page-redesign__more-button-icon--up::after {
  transform: rotate(45deg);
}

@media (max-width: 1260px) {
  .expeditions-page-redesign__container {
    width: calc(100% - 80px);
  }

  .expeditions-page-redesign__grid {
    grid-template-columns: repeat(2, 405px);
  }
}

@media (max-width: 920px) {
  .expeditions-page-redesign__container {
    width: calc(100% - 32px);
  }

  .expeditions-page-redesign__grid {
    grid-template-columns: minmax(0, 405px);
  }

  .expeditions-page-redesign__card {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .expeditions-page-redesign__hero {
    min-height: auto;
    padding: 36px 0 42px;
  }

  .expeditions-page-redesign__hero h1 {
    font-size: 34px;
    line-height: 40px;
  }

  .expeditions-page-redesign__hero p {
    font-size: 17px;
    line-height: 24px;
  }

  .expeditions-page-redesign__content {
    min-height: auto;
    padding: 40px 0 48px;
  }

  .expeditions-page-redesign__card {
    min-height: 500px;
    height: auto;
  }

  .expeditions-page-redesign__card h2 {
    font-size: 24px;
    line-height: 30px;
  }

  .expeditions-page-redesign__more-button {
    margin-top: 44px;
  }
}
</style>