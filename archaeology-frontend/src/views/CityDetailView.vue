<template>
  <main class="city-detail-redesign">
    <section class="city-detail-redesign__content-section">
      <div class="city-detail-redesign__container">
        <article class="city-detail-redesign__article" v-reveal>
          <h2>{{ city.title }}</h2>

          <p v-if="city.greek" class="city-detail-redesign__subtitle">
            {{ city.greek }}
          </p>

          <RichText
            :blocks="city.content?.blocks || placeholderBlocks"
            :notes="city.content?.notes || {}"
          />
        </article>

        <div class="city-detail-redesign__actions">
          <router-link
            :to="{ name: 'map', query: { city: city.id } }"
            class="city-detail-redesign__map-button"
          >
            <span class="city-detail-redesign__map-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
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
            </span>
            <span>Смотреть на карте</span>
          </router-link>

          <router-link to="/cities" class="city-detail-redesign__back-link">
            ← К списку городов
          </router-link>
        </div>
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
    id: 0,
    slug: 'placeholder',
    title: 'Город',
    greek: 'В разработке',
    period: 'VII век до н.э.',
    image: placeholder,
    content: placeholderCityContent
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap');

.city-detail-redesign,
.city-detail-redesign *,
.city-detail-redesign *::before,
.city-detail-redesign *::after {
  box-sizing: border-box;
}

.city-detail-redesign {
  min-height: 100vh;
  background: #ffffff;
  color: #3a2e1f;
}

.city-detail-redesign__container {
  width: min(1288px, calc(100% - 152px));
  margin: 0 auto;
}

.city-detail-redesign__content-section {
  min-height: 1246px;
  padding: 40px 0 54px;
  background: #ffffff;
}

.city-detail-redesign__article {
  width: 100%;
}

.city-detail-redesign__article h2 {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  color: #3a2e1f;
}

.city-detail-redesign__subtitle {
  margin: 18px 0 10px;
  font-family: Lora, Georgia, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 31px;
  color: #3a2e1f;
}

.city-detail-redesign__article :deep(.rich-text) {
  margin-top: 10px;
  font-family: Lora, Georgia, serif;
  color: #3a2e1f;
}

.city-detail-redesign__article :deep(.rich-text p) {
  margin: 0 0 18px;
  font-size: 24px;
  font-weight: 400;
  line-height: 31px;
  color: #3a2e1f;
}

.city-detail-redesign__article :deep(.rich-text__heading) {
  margin: 38px 0 14px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  color: #3a2e1f;
}

.city-detail-redesign__article :deep(.rich-text__list) {
  margin: 0 0 22px;
  padding-left: 26px;
  font-family: Lora, Georgia, serif;
  font-size: 24px;
  line-height: 31px;
  color: #3a2e1f;
}

.city-detail-redesign__article :deep(.rich-text__list li + li) {
  margin-top: 8px;
}

.city-detail-redesign__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  margin-top: 46px;
}

.city-detail-redesign__map-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 185px;
  height: 35px;
  padding: 0 17px 0 0;
  background: #2a9d8e;
  border-radius: 5px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: #faf6ed;
  transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;
}

.city-detail-redesign__map-button:hover {
  background: #248b7e;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(58, 46, 31, .15);
}

.city-detail-redesign__map-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  color: #faf6ed;
}

.city-detail-redesign__map-icon svg {
  display: block;
  width: 22px;
  height: 22px;
}

.city-detail-redesign__back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #3a2e1f;
  transition: color .2s ease, transform .2s ease;
}

.city-detail-redesign__back-link:hover {
  color: #2a9d8e;
  transform: translateX(-2px);
}

@media (max-width: 1100px) {
  .city-detail-redesign__container {
    width: calc(100% - 80px);
  }

  .city-detail-redesign__article :deep(.rich-text p),
  .city-detail-redesign__article :deep(.rich-text__list) {
    font-size: 21px;
    line-height: 30px;
  }
}

@media (max-width: 860px) {
  .city-detail-redesign__container {
    width: calc(100% - 32px);
  }

  .city-detail-redesign__content-section {
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .city-detail-redesign__article h2 {
    font-size: 32px;
    line-height: 38px;
  }

  .city-detail-redesign__subtitle {
    font-size: 20px;
    line-height: 27px;
  }

  .city-detail-redesign__article :deep(.rich-text p),
  .city-detail-redesign__article :deep(.rich-text__list) {
    font-size: 18px;
    line-height: 28px;
  }

  .city-detail-redesign__actions {
    flex-direction: column;
    gap: 12px;
  }

  .city-detail-redesign__map-button {
    width: 100%;
  }
}
</style>