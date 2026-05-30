<template>
  <main class="history-page-redesign">
    <section class="history-page-redesign__hero">
      <div class="history-page-redesign__hero-inner">
        <h1>
          <span class="history-page-redesign__hero-main">ИСТОРИЯ АРХЕОЛОГИИ</span>
          <span class="history-page-redesign__hero-accent">Северного Причерноморья</span>
        </h1>

        <p>
          История изучения античных памятников Северного Причерноморья:
          от первых находок до современных исследований.
        </p>
      </div>
    </section>

    <section class="history-page-redesign__content">
      <div class="history-page-redesign__container">
        <article
          v-for="item in historyItems"
          :key="item.id"
          class="history-page-redesign__article"
          v-reveal
        >
          <p v-if="item.period" class="history-page-redesign__period">
            {{ item.period }}
          </p>

          <h2>{{ item.title }}</h2>

          <div class="history-page-redesign__text">
            <p
              v-for="(paragraph, index) in getParagraphs(item)"
              :key="index"
            >
              {{ paragraph }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { historyItems } from '../data/history'

function getParagraphs(item) {
  const text = item.full || item.short || ''

  if (Array.isArray(text)) {
    return text.filter(Boolean)
  }

  return String(text)
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
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
  width: min(1288px, calc(100% - 152px));
  margin: 0 auto;
}

.history-page-redesign__hero {
  min-height: 250px;
  padding: 23px 0 34px;
  background: #f5f1e8;
  border-bottom: 2px solid #c9a55c;
}

.history-page-redesign__hero-inner {
  width: min(692px, calc(100% - 40px));
  margin: 0 auto;
  text-align: center;
}

.history-page-redesign__hero h1 {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.history-page-redesign__hero h1 span {
  display: block;
}

.history-page-redesign__hero-main {
  color: #3a2e1f;
}

.history-page-redesign__hero-accent {
  color: #2a9d8e;
}

.history-page-redesign__hero p {
  margin: 18px auto 0;
  font-family: Lora, Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  color: #6b5a3a;
}

.history-page-redesign__content {
  min-height: 1284px;
  padding: 40px 0 72px;
  background: #ffffff;
}

.history-page-redesign__article {
  padding: 0 0 46px;
  margin: 0 0 46px;
  border-bottom: 1px solid #e5c97a;
}

.history-page-redesign__article:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}

.history-page-redesign__period {
  margin: 0 0 14px;
  font-family: Lora, Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  color: #6b5a3a;
}

.history-page-redesign__article h2 {
  margin: 0 0 18px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  color: #3a2e1f;
}

.history-page-redesign__text {
  font-family: Lora, Georgia, serif;
  color: #3a2e1f;
}

.history-page-redesign__text p {
  margin: 0 0 18px;
  font-size: 24px;
  font-weight: 400;
  line-height: 31px;
  color: #3a2e1f;
}

.history-page-redesign__text p:last-child {
  margin-bottom: 0;
}

@media (max-width: 1100px) {
  .history-page-redesign__container {
    width: calc(100% - 80px);
  }

  .history-page-redesign__text p {
    font-size: 21px;
    line-height: 30px;
  }
}

@media (max-width: 860px) {
  .history-page-redesign__container {
    width: calc(100% - 32px);
  }

  .history-page-redesign__content {
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .history-page-redesign__hero {
    min-height: auto;
    padding: 36px 0 42px;
  }

  .history-page-redesign__hero h1 {
    font-size: 34px;
    line-height: 40px;
  }

  .history-page-redesign__hero p {
    font-size: 17px;
    line-height: 24px;
  }

  .history-page-redesign__content {
    padding: 32px 0 48px;
  }

  .history-page-redesign__article {
    margin-bottom: 34px;
    padding-bottom: 34px;
  }

  .history-page-redesign__period {
    font-size: 18px;
    line-height: 25px;
  }

  .history-page-redesign__article h2 {
    font-size: 32px;
    line-height: 38px;
  }

  .history-page-redesign__text p {
    font-size: 18px;
    line-height: 28px;
  }
}
</style>