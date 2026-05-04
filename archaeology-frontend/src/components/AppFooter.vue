<template>
  <footer class="footer">
    <div class="container footer__grid">
      <section>
        <h2>Название проекта</h2>
        <p>
          Интерактивный портал об античных греческих колониях Северного Причерноморья и Крыма.
          История, археология, экспедиции Эрмитажа.
        </p>
        <img src="../assets/footer-temple.png" alt="" class="footer__temple">
      </section>

      <section>
        <h2>Навигация</h2>
        <router-link to="/">Главная</router-link>
        <router-link :to="{ name: 'wip', query: { title: 'Карта' } }">Карта</router-link>
        <router-link to="/cities">Города</router-link>
        <router-link to="/history">История</router-link>
        <router-link to="/expeditions">Экспедиции</router-link>
      </section>

      <section>
        <h2>Города</h2>
        <div class="footer__city-links">
          <router-link
            v-for="city in cities"
            :key="city.id"
            :to="{ name: 'city-detail', params: { id: city.id } }"
          >
            {{ city.title }}
          </router-link>
        </div>
      </section>
    </div>

    <div class="container footer__bottom">
      Образовательный проект. Основано на материалах Государственного музея Эрмитаж.
    </div>
  </footer>
</template>

<script setup>
import { cities } from '../data/cities'
</script>