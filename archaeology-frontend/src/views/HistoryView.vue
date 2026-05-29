<template>
  <main class="history-page-redesign">
    <section class="history-page-redesign__content">
      <div class="history-page-redesign__container">
        <div class="history-page-redesign__grid">
          <article
            v-for="item in visibleHistoryItems"
            :key="item.id"
            class="history-page-redesign__card"
            v-reveal
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="history-page-redesign__card-image"
            >

            <div
              v-else
              class="history-page-redesign__card-image history-page-redesign__card-image--empty"
              aria-hidden="true"
            ></div>

            <div class="history-page-redesign__card-body">
              <p class="history-page-redesign__card-period">
                {{ item.period }}
              </p>

              <h2>{{ item.title }}</h2>

              <p class="history-page-redesign__card-text">
                {{ item.short }}
              </p>

              <router-link
                :to="{ name: 'history-detail', params: { id: item.id } }"
                class="history-page-redesign__card-link"
              >
                Подробнее →
              </router-link>
            </div>
          </article>
        </div>

        <button
          v-if="!showAll && hiddenCount > 0"
          class="history-page-redesign__more-button"
          type="button"
          @click="showAll = true"
        >
          <span class="history-page-redesign__more-button-icon" aria-hidden="true"></span>
          <span>Показать еще ({{ hiddenCount }})</span>
        </button>

        <button
          v-else-if="showAll && hiddenCount > 0"
          class="history-page-redesign__more-button"
          type="button"
          @click="showAll = false"
        >
          <span class="history-page-redesign__more-button-icon history-page-redesign__more-button-icon--up" aria-hidden="true"></span>
          <span>Свернуть список</span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { historyItems } from '../data/history'

const showAll = ref(false)
const initialCount = 6

const visibleHistoryItems = computed(() => {
  return showAll.value ? historyItems : historyItems.slice(0, initialCount)
})

const hiddenCount = computed(() => {
  return Math.max(historyItems.length - initialCount, 0)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap');

.history-page-redesign,
.history-page-redesign *,
.history-page-redesign *::before,
.history-page-redesign *::after {
  box-sizing: border-box;
}

.history-page-redesign {
  min-height: 100vh;
  background: #ffffff;
  color: #3a2e1f;
}

.history-page-redesign__container {
  width: min(1278px, calc(100% - 162px));
  margin: 0 auto;
}

.history-page-redesign__content {
  min-height: 1284px;
  padding: 82px 0 54px;
  background: #ffffff;
}

.history-page-redesign__grid {
  display: grid;
  grid-template-columns: repeat(3, 405px);
  gap: 36px 31px;
  align-items: start;
  justify-content: center;
}

.history-page-redesign__card {
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

.history-page-redesign__card:hover {
  transform: translateY(-4px);
  border-color: #c9a55c;
  box-shadow: 0 14px 28px rgba(80, 59, 31, .13);
}

.history-page-redesign__card-image {
  display: block;
  width: 100%;
  height: 190px;
  flex: 0 0 190px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px 12px 0 0;
}

.history-page-redesign__card-image--empty {
  background: #faf6ed;
}

.history-page-redesign__card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 20px 24px 22px;
}

.history-page-redesign__card-period {
  margin: 0 0 10px;
  font-family: Lora, Georgia, serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #6b5a3a;
}

.history-page-redesign__card h2 {
  margin: 0 0 12px;
  overflow: visible;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 31px;
  color: #3a2e1f;
}

.history-page-redesign__card-text {
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

.history-page-redesign__card-link {
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

.history-page-redesign__card-link:hover {
  color: #248b7e;
  transform: translateX(3px);
}

.history-page-redesign__more-button {
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

.history-page-redesign__more-button:hover {
  background: #248b7e;
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(58, 46, 31, .16);
}

.history-page-redesign__more-button-icon {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
}

.history-page-redesign__more-button-icon::before,
.history-page-redesign__more-button-icon::after {
  content: '';
  position: absolute;
  top: 10px;
  width: 10px;
  height: 2px;
  background: #faf6ed;
  border-radius: 2px;
}

.history-page-redesign__more-button-icon::before {
  left: 3px;
  transform: rotate(45deg);
}

.history-page-redesign__more-button-icon::after {
  right: 3px;
  transform: rotate(-45deg);
}

.history-page-redesign__more-button-icon--up::before {
  transform: rotate(-45deg);
}

.history-page-redesign__more-button-icon--up::after {
  transform: rotate(45deg);
}

@media (max-width: 1260px) {
  .history-page-redesign__container {
    width: calc(100% - 80px);
  }

  .history-page-redesign__grid {
    grid-template-columns: repeat(2, 405px);
  }
}

@media (max-width: 920px) {
  .history-page-redesign__container {
    width: calc(100% - 32px);
  }

  .history-page-redesign__grid {
    grid-template-columns: minmax(0, 405px);
  }

  .history-page-redesign__card {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .history-page-redesign__content {
    min-height: auto;
    padding: 40px 0 48px;
  }

  .history-page-redesign__card {
    min-height: 500px;
    height: auto;
  }

  .history-page-redesign__card h2 {
    font-size: 24px;
    line-height: 30px;
  }

  .history-page-redesign__more-button {
    margin-top: 44px;
  }
}
</style>