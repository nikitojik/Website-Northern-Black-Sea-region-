import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import CitiesView from './views/CitiesView.vue'
import CityDetailView from './views/CityDetailView.vue'
import ContentDetailView from './views/ContentDetailView.vue'
import WipView from './views/WipView.vue'
import HistoryView from './views/HistoryView.vue'
import ExpeditionsView from './views/ExpeditionsView.vue'
import './styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cities', name: 'cities', component: CitiesView },
    { path: '/cities/:id', name: 'city-detail', component: CityDetailView },
    { path: '/history', name: 'history', component: HistoryView },
    { path: '/history/:id', name: 'history-detail', component: ContentDetailView },
    { path: '/expeditions', name: 'expeditions', component: ExpeditionsView },
    { path: '/expeditions/:id', name: 'expedition-detail', component: ContentDetailView },
    { path: '/wip', name: 'wip', component: WipView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

const app = createApp(App)

app.directive('reveal', {
  mounted(el, binding) {
    const delay = Number(binding.value || 0)

    el.classList.add('reveal')
    el.style.setProperty('--reveal-delay', `${delay}ms`)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.14 }
    )

    observer.observe(el)
  }
})

app.use(router).mount('#app')