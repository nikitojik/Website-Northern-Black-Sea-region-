<template>
  <main>
    <section class="page-hero" v-reveal>
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--left">
      <img src="../assets/corner.png" alt="" class="page-hero__corner page-hero__corner--right">

      <div class="container page-hero__inner">
        <div>
          <h1>Экспедиции Эрмитажа</h1>
          <p>Археологические экспедиции Государственного Эрмитажа в Северном Причерноморье и Крыму</p>
        </div>
      </div>
    </section>

    <section class="content-page container">
      <div class="section-head content-page__head" v-reveal>
        <div>
          <h2>Действующие экспедиции</h2>
          <p>Исследования античных памятников, проводимые музеем в наши дни</p>
        </div>
      </div>

      <div class="content-grid">
        <article
          v-for="item in expeditionItems"
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
              :to="{ name: 'expedition-detail', params: { id: item.id } }"
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
import { expeditionItems } from '../data/expeditions'
</script>
