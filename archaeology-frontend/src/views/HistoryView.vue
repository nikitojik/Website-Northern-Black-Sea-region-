<template>
  <main>
    <section class="page-hero" v-reveal>
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--left">
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--right">

      <div class="container page-hero__inner">
        <div>
          <h1>История археологии</h1>
          <p>250 лет изучения античных памятников Северного Причерноморья: от первых находок до современных исследований</p>
        </div>
      </div>
    </section>

    <section class="content-page container">
      <div class="section-head content-page__head" v-reveal>
        <div>
          <h2>Этапы исследования</h2>
          <p>От зарождения античной археологии в России до современных экспедиций Эрмитажа</p>
        </div>
      </div>

      <div class="content-grid">
        <article
          v-for="item in historyItems"
          :key="item.id"
          class="content-card"
          v-reveal
        >
          <img :src="item.image" :alt="item.title" class="content-card__image">

          <div class="content-card__body">
            <div class="content-card__meta">{{ item.period }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.short }}</p>

            <router-link
              :to="{ name: 'history-detail', params: { id: item.id } }"
              class="content-card__link"
            >
              Подробнее →
            </router-link>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { historyItems } from '../data/history'
</script>
