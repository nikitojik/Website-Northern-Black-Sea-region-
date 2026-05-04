<template>
  <header class="header">
    <div class="container header__inner">
      <router-link to="/" class="header__logo">
        Археология
        <br>
        Северного Причерноморья
      </router-link>

      <nav class="header__nav">
        <router-link to="/">Главная</router-link>
        <router-link :to="{ name: 'map' }">Карта</router-link>
        <router-link to="/cities">Города</router-link>
        <router-link to="/history">История</router-link>
        <router-link to="/expeditions">Экспедиции</router-link>
      </nav>
    </div>
  </header>
</template>
