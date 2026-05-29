<template>
  <header class="header">
    <div class="header__inner">
      <router-link to="/" class="header__logo">
        Археология Северного<br>
        Причерноморья
      </router-link>

      <nav class="header__nav" aria-label="Главная навигация">
        <router-link to="/">Главная</router-link>
        <router-link :to="{ name: 'map' }">Карта</router-link>
        <router-link to="/cities">Города</router-link>
        <router-link to="/history">История</router-link>
        <router-link to="/expeditions">Экспедиции</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500&family=Inter:wght@400&display=swap');

.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 80px;
  background: #ffffff;
  border-bottom: 2px solid #c9a55c;
  box-shadow: none;
}

.header__inner {
  width: min(1064px, calc(100% - 80px));
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.header__logo {
  width: 220px;
  font-family: Lora, Georgia, serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 19px;
  color: #3a2e1f;
  transition: color .2s ease;
}

.header__logo:hover {
  color: #2a9d8e;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 42px;
  font-family: Lora, Georgia, serif;
}

.header__nav a {
  position: relative;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #6b5a3a;
  transition: color .2s ease;
}

.header__nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -10px;
  height: 2px;
  background: #2a9d8e;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .2s ease;
}

.header__nav a:hover,
.header__nav .router-link-active {
  color: #3a2e1f;
}

.header__nav a:hover::after,
.header__nav .router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 920px) {
  .header {
    height: auto;
  }

  .header__inner {
    width: calc(100% - 32px);
    min-height: 80px;
    padding: 16px 0;
    align-items: flex-start;
  }

  .header__nav {
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px 22px;
  }
}

@media (max-width: 560px) {
  .header__inner {
    flex-direction: column;
    gap: 14px;
  }

  .header__nav {
    justify-content: flex-start;
  }
}
</style>