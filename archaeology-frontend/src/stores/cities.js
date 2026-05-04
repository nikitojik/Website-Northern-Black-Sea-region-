import { defineStore } from 'pinia'
import { cities } from '../data/cities'

export const useCitiesStore = defineStore('cities', {
  state: () => ({
    cities,
    selectedCityId: null
  }),

  getters: {
    majorCities: (state) => state.cities.filter((c) => c.isMajor),
    hermitageCities: (state) => state.cities.filter((c) => c.isHermitage),
    regularCities: (state) =>
      state.cities.filter((c) => !c.isMajor && !c.isHermitage),

    getCityById: (state) => (id) =>
      state.cities.find((c) => c.id === Number(id)),

    getCityBySlug: (state) => (slug) =>
      state.cities.find((c) => c.slug === slug),

    selectedCity: (state) => {
      if (!state.selectedCityId) return null
      return state.cities.find((c) => c.id === state.selectedCityId)
    }
  },

  actions: {
    selectCity(id) {
      this.selectedCityId = id
    },
    clearSelection() {
      this.selectedCityId = null
    }
  }
})
