<template>
  <div class="sea-map-redesign" ref="mapWrapper">
    <div ref="mapContainer" class="sea-map-redesign__canvas"></div>

    <Transition name="sea-map-redesign-popup">
      <article
        v-if="selectedCity"
        class="sea-map-redesign__popup"
        :style="popupStyle"
      >
        <h3>{{ selectedCity.title }}</h3>
        <p>{{ getShortText(selectedCity) }}</p>

        <router-link
          :to="{ name: 'city-detail', params: { id: selectedCity.id } }"
          class="sea-map-redesign__popup-link"
        >
          Подробнее →
        </router-link>
      </article>
    </Transition>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '../data/cities'

const route = useRoute()

const mapContainer = ref(null)
const mapWrapper = ref(null)
const selectedCity = ref(null)
const popupLeft = ref(0)
const popupTop = ref(0)

let map = null
let markers = []
let selectedLatLng = null

const popupStyle = computed(() => ({
  left: `${popupLeft.value}px`,
  top: `${popupTop.value}px`
}))

function getShortText(city) {
  return (
    city.content?.shortDescription ||
    city.content?.short ||
    city.content?.description ||
    'Краткое описание города'
  )
}

function getCityKind(city) {
  if (['pantikapey', 'olbia', 'chersonesus', 'phanagoria', 'tanais', 'gorgippia'].includes(city.slug)) {
    return 'red'
  }

  if (['mirmekiy', 'nimfey', 'tiritaka', 'kimmerik'].includes(city.slug)) {
    return 'blue'
  }

  if (['hermonassa', 'germonassa', 'borisfen'].includes(city.slug)) {
    return 'green'
  }

  return 'gold'
}

function getMarkerSvg(kind) {
  if (kind === 'red') {
    return `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M4 19h16" />
        <path d="M6 16h12" />
        <path d="M8 16V9" />
        <path d="M12 16V9" />
        <path d="M16 16V9" />
        <path d="M5 9h14" />
        <path d="M12 4 5 9h14L12 4Z" />
      </svg>
    `
  }

  if (kind === 'blue') {
    return `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M9 4h6" />
        <path d="M10 4v5l-5 8a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8V4" />
        <path d="M8 15h8" />
      </svg>
    `
  }

  if (kind === 'green') {
    return `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M4 19h16" />
        <path d="M5 9h14" />
        <path d="M7 9v10" />
        <path d="M11 9v10" />
        <path d="M15 9v10" />
        <path d="M19 9v10" />
        <path d="M12 4 4 9h16L12 4Z" />
      </svg>
    `
  }

  return `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4 19h16" />
      <path d="M6 19v-7l6-5 6 5v7" />
      <path d="M9 19v-5h6v5" />
      <path d="M12 7V4" />
      <path d="M10 4h4" />
    </svg>
  `
}

function createMarkerIcon(city, active = false) {
  const kind = getCityKind(city)

  return L.divIcon({
    className: 'sea-map-redesign-marker',
    html: `
      <span class="sea-map-redesign-marker__symbol sea-map-redesign-marker__symbol--${kind}${active ? ' sea-map-redesign-marker__symbol--active' : ''}">
        ${getMarkerSvg(kind)}
      </span>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}

function updateMarkers() {
  markers.forEach(({ marker, city }) => {
    marker.setIcon(createMarkerIcon(city, selectedCity.value?.id === city.id))
  })
}

function placePopup(latlng) {
  if (!map || !mapWrapper.value) return

  const point = map.latLngToContainerPoint(latlng)

  const popupHeight = 112
  const markerSize = 30
  const markerHalf = markerSize / 2
  const gap = 10

  const left = point.x + markerSize + gap
  const top = point.y - popupHeight / 2 + markerHalf

  popupLeft.value = left
  popupTop.value = top
  popupArrowSide.value = 'left'

  if (typeof popupArrowTop !== 'undefined') {
    popupArrowTop.value = popupHeight / 2
  }
}

function openPopup(city, latlng) {
  selectedCity.value = city
  selectedLatLng = latlng
  placePopup(latlng)
  updateMarkers()
}

function closePopup() {
  selectedCity.value = null
  selectedLatLng = null
  updateMarkers()
}

function handleMapMove() {
  if (selectedLatLng) {
    placePopup(selectedLatLng)
  }
}

function focusCityById(cityId) {
  if (!map) return

  const normalizedId = Number(cityId)
  if (!normalizedId) return

  const markerItem = markers.find(({ city }) => city.id === normalizedId)
  if (!markerItem) return

  const latlng = markerItem.marker.getLatLng()
  const targetZoom = map.getMaxZoom()

  const openFocusedPopup = () => {
    openPopup(markerItem.city, latlng)
  }

  map.once('moveend', openFocusedPopup)

  map.setView(latlng, targetZoom, {
    animate: true
  })

  setTimeout(() => {
    if (selectedCity.value?.id !== markerItem.city.id) {
      openFocusedPopup()
    }
  }, 450)
}

function focusCityFromRoute() {
  focusCityById(route.query.city)
}

defineExpose({
  focusCityById
})

onMounted(async () => {
  await nextTick()

  map = L.map(mapContainer.value, {
    center: [45.4, 35.3],
    zoom: 7,
    minZoom: 5,
    maxZoom: 10,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(map)

  cities.forEach((city) => {
    if (!city.lat || !city.lng) return

    const marker = L.marker([city.lat, city.lng], {
      icon: createMarkerIcon(city, false)
    }).addTo(map)

    marker.on('click', (event) => {
  L.DomEvent.stopPropagation(event)
  focusCityById(city.id)
})

    markers.push({ marker, city })
  })

  if (markers.length > 0) {
    const group = L.featureGroup(markers.map(item => item.marker))
    map.fitBounds(group.getBounds().pad(0.16))
  }

  map.on('click', closePopup)
  map.on('zoom move resize', handleMapMove)

  setTimeout(() => {
    focusCityFromRoute()
  }, 250)
})

watch(
  () => route.query.city,
  () => {
    focusCityFromRoute()
  }
)

onBeforeUnmount(() => {
  if (map) {
    map.off('zoom move resize', handleMapMove)
    map.remove()
    map = null
  }

  markers = []
})
</script>

<style>
.sea-map-redesign-marker {
  width: 30px !important;
  height: 30px !important;
  margin: 0 !important;
  background: transparent !important;
  border: 0 !important;
}

.sea-map-redesign-marker__symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 2px 7px rgba(58, 46, 31, .22);
  transition: transform .16s ease, box-shadow .16s ease, background-color .16s ease;
}

.sea-map-redesign-marker__symbol svg {
  display: block;
  width: 19px;
  height: 19px;
}

.sea-map-redesign-marker__symbol svg path,
.sea-map-redesign-marker__symbol svg circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sea-map-redesign-marker__symbol--red {
  background: rgba(255, 255, 255, .94);
  color: #be4a48;
  border: 3px solid rgba(190, 74, 72, .7);
}

.sea-map-redesign-marker__symbol--blue {
  background: rgba(255, 255, 255, .94);
  color: #2a9d8e;
  border: 3px solid rgba(42, 157, 142, .7);
}

.sea-map-redesign-marker__symbol--gold {
  background: rgba(255, 255, 255, .94);
  color: #c9a55c;
  border: 3px solid rgba(201, 165, 92, .76);
}

.sea-map-redesign-marker__symbol--green {
  background: rgba(255, 255, 255, .94);
  color: #4e915e;
  border: 3px solid rgba(78, 145, 94, .72);
}

.sea-map-redesign-marker__symbol--active {
  transform: scale(1.14);
  box-shadow: 0 0 0 4px rgba(42, 157, 142, .18), 0 4px 10px rgba(58, 46, 31, .26);
}

.sea-map-redesign-marker:hover .sea-map-redesign-marker__symbol {
  transform: scale(1.12);
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Lora:wght@400;500;600&display=swap');

.sea-map-redesign,
.sea-map-redesign *,
.sea-map-redesign *::before,
.sea-map-redesign *::after {
  box-sizing: border-box;
}

.sea-map-redesign {
  position: relative;
  width: 100%;
  height: 861px;
  overflow: hidden;
  background: #d7e7ef;
}

.sea-map-redesign__canvas {
  width: 100%;
  height: 861px;
}

.sea-map-redesign__canvas :deep(.leaflet-control-container) {
  display: none;
}

.sea-map-redesign__canvas :deep(.leaflet-tile-pane) {
  filter: saturate(1.12) contrast(1) brightness(1.02);
}

.sea-map-redesign__popup {
  position: absolute;
  z-index: 900;
  width: 176px;
  min-height: 112px;
  padding: 11px 13px 12px;
  background: rgba(255, 255, 255, .98);
  border-radius: 7px;
  box-shadow: 0 10px 22px rgba(58, 46, 31, .2);
}

.sea-map-redesign__popup::after {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, .98);
  transform: translateY(-50%) rotate(45deg);
}

.sea-map-redesign__popup h3 {
  margin: 0 0 5px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 19px;
  font-weight: 700;
  line-height: 21px;
  color: #3a2e1f;
}

.sea-map-redesign__popup p {
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  font-family: Lora, Georgia, serif;
  font-size: 13px;
  line-height: 17px;
  color: #6b5a3a;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.sea-map-redesign__popup-link {
  display: inline-flex;
  margin-top: 8px;
  font-family: Lora, Georgia, serif;
  font-size: 13px;
  font-weight: 600;
  color: #2a9d8e;
}

.sea-map-redesign-popup-enter-active,
.sea-map-redesign-popup-leave-active {
  transition: opacity .18s ease, transform .18s ease;
}

.sea-map-redesign-popup-enter-from,
.sea-map-redesign-popup-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 920px) {
  .sea-map-redesign,
  .sea-map-redesign__canvas {
    height: 720px;
  }
}

@media (max-width: 640px) {
  .sea-map-redesign,
  .sea-map-redesign__canvas {
    height: 560px;
  }
}
</style>