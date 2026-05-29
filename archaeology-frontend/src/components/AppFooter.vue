<template>
  <footer class="footer">
    <div class="footer__inner">
      <section class="footer__about">
        <h2>Археология Северного Причерноморья</h2>
        <p>
          Интерактивный портал об античных греческих колониях Северного Причерноморья и Крыма.
          История, археология, экспедиции Эрмитажа.
        </p>
        <img src="../assets/footer-temple.png" alt="" class="footer__image">
      </section>

      <nav class="footer__column" aria-label="Навигация в подвале">
        <h2>Навигация</h2>
        <router-link to="/">Главная</router-link>
        <router-link :to="{ name: 'map' }">Карта</router-link>
        <router-link to="/cities">Города</router-link>
        <router-link to="/history">История археологии</router-link>
        <router-link to="/expeditions">Экспедиции</router-link>
      </nav>

      <nav class="footer__column" aria-label="Города">
        <h2>Города</h2>
        <router-link :to="{ name: 'city-detail', params: { id: 1 } }">Пантикапей</router-link>
        <router-link :to="{ name: 'city-detail', params: { id: 2 } }">Ольвия</router-link>
        <router-link :to="{ name: 'city-detail', params: { id: 3 } }">Херсонес</router-link>
        <router-link :to="{ name: 'city-detail', params: { id: 4 } }">Фанагория</router-link>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500&family=Inter:wght@400&display=swap');

.footer {
  min-height: 320px;
  padding: 20px 0 36px;
  background: #f5f1e8;
  border-top: 2px solid #c9a55c;
}

.footer__inner {
  width: min(1280px, calc(100% - 80px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(320px, 1fr) 220px 250px;
  gap: 72px;
}

.footer h2 {
  margin: 0 0 14px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: #3a2e1f;
}

.footer p,
.footer a {
  font-family: Lora, Georgia, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #6b5a3a;
}

.footer__about p {
  max-width: 402px;
}

.footer__image {
  display: block;
  width: 242px;
  height: 112px;
  margin-top: 26px;
  object-fit: cover;
  object-position: center;
}

.footer__column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-top: 4px;
}

.footer__column a {
  transition: color .2s ease, transform .2s ease;
}

.footer__column a:hover {
  color: #2a9d8e;
  transform: translateX(3px);
}

@media (max-width: 900px) {
  .footer__inner {
    width: calc(100% - 32px);
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }

  .footer__about {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>