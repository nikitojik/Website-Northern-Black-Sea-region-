<template>
  <main class="content-detail-redesign">
    <section class="content-detail-redesign__content-section">
      <div class="content-detail-redesign__container">
        <article class="content-detail-redesign__article" v-reveal>
          <p v-if="item.period" class="content-detail-redesign__period">
            {{ item.period }}
          </p>

          <h2>{{ item.title }}</h2>

          <RichText
            v-if="item.content"
            :blocks="item.content.blocks || []"
            :notes="item.content.notes || {}"
          />

          <div v-else class="content-detail-redesign__text">
            <p v-for="(paragraph, index) in paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </article>

        <div class="content-detail-redesign__actions">
          <router-link :to="backLink" class="content-detail-redesign__back-button">
            <span aria-hidden="true">←</span>
            <span>{{ backText }}</span>
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
import { expeditionItems } from '../data/expeditions'
import { historyItems } from '../data/history'

const route = useRoute()

const isExpedition = computed(() => route.name === 'expedition-detail')
const collection = computed(() => (isExpedition.value ? expeditionItems : historyItems))
const backLink = computed(() => (isExpedition.value ? '/expeditions' : '/history'))
const backText = computed(() => (isExpedition.value ? 'К списку экспедиций' : 'К списку историй'))

const item = computed(() => {
  const id = Number(route.params.id)

  return collection.value.find((entry) => entry.id === id) || {
    title: 'Раздел в разработке',
    period: '',
    image: placeholder,
    short: 'КРАТКОЕ ОПИСАНИЕ',
    full: 'ПОЛНОЕ ОПИСАНИЕ'
  }
})

const paragraphs = computed(() => {
  const text = item.value.full || item.value.short || 'ПОЛНОЕ ОПИСАНИЕ'

  if (Array.isArray(text)) {
    return text.filter(Boolean)
  }

  return String(text)
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap');

.content-detail-redesign,
.content-detail-redesign *,
.content-detail-redesign *::before,
.content-detail-redesign *::after {
  box-sizing: border-box;
}

.content-detail-redesign {
  min-height: 100vh;
  background: #ffffff;
  color: #3a2e1f;
}

.content-detail-redesign__container {
  width: min(1288px, calc(100% - 152px));
  margin: 0 auto;
}

.content-detail-redesign__content-section {
  min-height: 1246px;
  padding: 40px 0 54px;
  background: #ffffff;
}

.content-detail-redesign__article {
  width: 100%;
}

.content-detail-redesign__period {
  margin: 0 0 18px;
  font-family: Lora, Georgia, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 31px;
  color: #3a2e1f;
}

.content-detail-redesign__article h2 {
  margin: 0 0 18px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  color: #3a2e1f;
}

.content-detail-redesign__text,
.content-detail-redesign__article :deep(.rich-text) {
  margin-top: 10px;
  font-family: Lora, Georgia, serif;
  color: #3a2e1f;
}

.content-detail-redesign__text p,
.content-detail-redesign__article :deep(.rich-text p) {
  margin: 0 0 18px;
  font-size: 24px;
  font-weight: 400;
  line-height: 31px;
  color: #3a2e1f;
}

.content-detail-redesign__article :deep(.rich-text__heading) {
  margin: 38px 0 14px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  color: #3a2e1f;
}

.content-detail-redesign__article :deep(.rich-text__list) {
  margin: 0 0 22px;
  padding-left: 26px;
  font-family: Lora, Georgia, serif;
  font-size: 24px;
  line-height: 31px;
  color: #3a2e1f;
}

.content-detail-redesign__article :deep(.rich-text__list li + li) {
  margin-top: 8px;
}

.content-detail-redesign__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 46px;
}

.content-detail-redesign__back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 185px;
  height: 35px;
  padding: 0 17px;
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

.content-detail-redesign__back-button:hover {
  background: #248b7e;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(58, 46, 31, .15);
}

@media (max-width: 1100px) {
  .content-detail-redesign__container {
    width: calc(100% - 80px);
  }

  .content-detail-redesign__text p,
  .content-detail-redesign__article :deep(.rich-text p),
  .content-detail-redesign__article :deep(.rich-text__list) {
    font-size: 21px;
    line-height: 30px;
  }
}

@media (max-width: 860px) {
  .content-detail-redesign__container {
    width: calc(100% - 32px);
  }

  .content-detail-redesign__content-section {
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .content-detail-redesign__article h2 {
    font-size: 32px;
    line-height: 38px;
  }

  .content-detail-redesign__period {
    font-size: 20px;
    line-height: 27px;
  }

  .content-detail-redesign__text p,
  .content-detail-redesign__article :deep(.rich-text p),
  .content-detail-redesign__article :deep(.rich-text__list) {
    font-size: 18px;
    line-height: 28px;
  }

  .content-detail-redesign__back-button {
    width: 100%;
  }
}
</style>
