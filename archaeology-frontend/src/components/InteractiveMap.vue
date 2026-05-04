<template>
  <div class="map-wrapper" ref="mapWrapper">
    <div class="map-container" ref="mapContainer"></div>

    <div class="map-legend">
      <h3 class="map-legend__title">Легенда</h3>
      <div class="map-legend__item">
        <span class="map-legend__marker map-legend__marker--major"></span>
        <span>Крупнейшие поселения</span>
      </div>
      <div class="map-legend__item">
        <span class="map-legend__marker map-legend__marker--hermitage"></span>
        <span>Экспедиции Эрмитажа</span>
      </div>
      <div class="map-legend__item">
        <span class="map-legend__marker map-legend__marker--regular"></span>
        <span>Античные города</span>
      </div>
    </div>

    <Transition name="map-popup">
      <div
        v-if="hoveredCity"
        class="map-popup"
        :style="popupStyle"
        @mouseenter="keepPopup"
        @mouseleave="scheduleHidePopup"
      >
        <img
          :src="hoveredCity.image"
          :alt="hoveredCity.title"
          class="map-popup__image"
        />
        <div class="map-popup__content">
          <div class="map-popup__head">
            <h3>{{ hoveredCity.title }}</h3>
            <span class="map-popup__greek">{{ hoveredCity.greek }}</span>
          </div>
          <p>{{ hoveredCity.content?.short || 'Краткое описание города' }}</p>
          <router-link
            :to="{ name: 'city-detail', params: { id: hoveredCity.id } }"
            class="btn btn--primary map-popup__button"
          >
            Подробнее →
          </router-link>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCitiesStore } from '../stores/cities'

const store = useCitiesStore()
const mapContainer = ref(null)
const mapWrapper = ref(null)
let map = null
let markers = []
let hidePopupTimeout = null

const hoveredCity = ref(null)
const popupX = ref(0)
const popupY = ref(0)

const popupStyle = computed(() => ({
  left: `${popupX.value}px`,
  top: `${popupY.value}px`
}))

function createIcon(type) {
  const colors = {
    major: { bg: '#c0392b', border: '#922b21', size: 18 },
    hermitage: { bg: '#2980b9', border: '#1f618d', size: 14 },
    regular: { bg: '#27ae60', border: '#1e8449', size: 12 }
  }

  const c = colors[type] || colors.regular
  const half = c.size / 2

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${c.size}px;
      height: ${c.size}px;
      background: ${c.bg};
      border: 2px solid ${c.border};
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    "></div>`,
    iconSize: [c.size, c.size],
    iconAnchor: [half, half],
    popupAnchor: [0, -half]
  })
}

function getMarkerType(city) {
  if (city.isMajor) return 'major'
  if (city.isHermitage) return 'hermitage'
  return 'regular'
}

function showPopup(city, latlng) {
  if (hidePopupTimeout) {
    clearTimeout(hidePopupTimeout)
    hidePopupTimeout = null
  }

  hoveredCity.value = city

  const point = map.latLngToContainerPoint(latlng)
  const wrapperRect = mapWrapper.value.getBoundingClientRect()
  const popupWidth = 320
  const popupHeight = 280

  let x = point.x + 20
  let y = point.y - 20

  if (x + popupWidth > wrapperRect.width) {
    x = point.x - popupWidth - 20
  }
  if (y + popupHeight > wrapperRect.height) {
    y = wrapperRect.height - popupHeight - 20
  }
  if (y < 20) y = 20
  if (x < 20) x = 20

  popupX.value = x
  popupY.value = y
}

function scheduleHidePopup() {
  hidePopupTimeout = setTimeout(() => {
    hoveredCity.value = null
  }, 300)
}

function keepPopup() {
  if (hidePopupTimeout) {
    clearTimeout(hidePopupTimeout)
    hidePopupTimeout = null
  }
}

onMounted(async () => {
  await nextTick()

  map = L.map(mapContainer.value, {
    center: [45.5, 34.5],
    zoom: 7,
    minZoom: 5,
    maxZoom: 12,
    zoomControl: true,
    attributionControl: false
  })

  const osmLayer = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 18
    }
  )

  const voyagerLayer = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      subdomains: 'abcd',
      maxZoom: 19
    }
  )

  osmLayer.addTo(map)

  L.control.layers(
    {
      'Классическая': osmLayer,
      'Современная': voyagerLayer
    },
    null,
    { position: 'bottomleft', collapsed: true }
  ).addTo(map)

  store.cities.forEach((city) => {
    if (!city.lat || !city.lng) return

    const type = getMarkerType(city)
    const icon = createIcon(type)

    const marker = L.marker([city.lat, city.lng], { icon })
      .addTo(map)

    marker.on('mouseover', () => {
      showPopup(city, marker.getLatLng())
    })

    marker.on('mouseout', () => {
      scheduleHidePopup()
    })

    marker.on('click', () => {
      hoveredCity.value = null
    })

    markers.push(marker)
  })

  const group = L.featureGroup(markers)
  map.fitBounds(group.getBounds().pad(0.15))
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
  markers = []
  if (hidePopupTimeout) {
    clearTimeout(hidePopupTimeout)
  }
})
</script>

<style>
.custom-marker {
  background: transparent !important;
  border: none !important;
}
</style>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  background: #e8e0d0;
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-container :deep(.leaflet-tile-pane) {
  filter: sepia(0.05) contrast(1.03) brightness(0.99);
}

.map-wrapper :deep(.leaflet-control-layers) {
  border: 1px solid var(--line-soft) !important;
  border-radius: 8px !important;
  background: rgba(255, 252, 244, 0.92) !important;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  color: var(--text);
  padding: 8px 12px !important;
  line-height: 1.6;
}

.map-wrapper :deep(.leaflet-control-layers-list label) {
  cursor: pointer;
  margin-bottom: 2px;
}

.map-wrapper :deep(.leaflet-control-layers-selector) {
  margin-right: 6px;
  accent-color: #8b6914;
}

.map-legend {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 800;
  padding: 16px 20px;
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  background: rgba(255, 252, 244, 0.92);
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 24px var(--shadow);
}

.map-legend__title {
  margin-bottom: 12px;
  font-size: 14px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
}

.map-legend__item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text);
}

.map-legend__item:last-child {
  margin-bottom: 0;
}

.map-legend__marker {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid;
}

.map-legend__marker--major {
  background: #c0392b;
  border-color: #922b21;
}

.map-legend__marker--hermitage {
  background: #2980b9;
  border-color: #1f618d;
}

.map-legend__marker--regular {
  background: #27ae60;
  border-color: #1e8449;
}

.map-popup {
  position: absolute;
  z-index: 900;
  width: 320px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  pointer-events: auto;
}

.map-popup__image {
  display: block;
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.map-popup__content {
  padding: 14px 16px 16px;
}

.map-popup__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.map-popup__head h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 16px;
  font-weight: 500;
}

.map-popup__greek {
  font-size: 11px;
  color: var(--muted);
}

.map-popup__content p {
  font-size: 12px;
  line-height: 1.45;
  color: var(--text);
  margin-bottom: 12px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.map-popup__button {
  font-size: 11px;
  min-height: 26px;
  padding: 0 14px;
}

.map-popup-enter-active,
.map-popup-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.map-popup-enter-from,
.map-popup-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .map-wrapper {
    height: calc(100vh - 48px);
  }

  .map-legend {
    top: 10px;
    right: 10px;
    padding: 12px 14px;
  }

  .map-legend__title {
    font-size: 12px;
  }

  .map-legend__item {
    font-size: 11px;
  }

  .map-popup {
    width: 260px;
  }

  .map-popup__image {
    height: 100px;
  }
}
</style>
