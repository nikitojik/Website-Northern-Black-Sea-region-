<template>
  <article class="city-card" @click="handleClick">
    <div class="city-card__image-wrap">
      <img :src="city.image" :alt="city.title" class="city-card__image">

      <span class="city-card__period">
        {{ city.period || 'VII век до н.э.' }}
      </span>
    </div>

    <h2>{{ city.title }}</h2>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  city: {
    type: Object,
    required: true
  },
  linkToDetail: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['open'])
const router = useRouter()

function handleClick() {
  if (props.linkToDetail) {
    router.push({
      name: 'city-detail',
      params: { id: props.city.id }
    })
    return
  }

  emit('open', props.city)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Inter:wght@400&display=swap');

.city-card {
  display: block;
  width: 402px;
  max-width: 100%;
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  color: #3a2e1f;
}

.city-card,
.city-card * {
  box-sizing: border-box;
}

.city-card__image-wrap {
  position: relative;
  width: 402px;
  max-width: 100%;
  height: 268px;
  overflow: hidden;
  border: 0;
  border-radius: 36px;
  background: transparent;
  box-shadow: none;
}

.city-card__image {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 36px;
  object-fit: cover;
  box-shadow: none;
  outline: none;
  transition: transform .35s ease, filter .35s ease;
}

.city-card:hover .city-card__image {
  transform: scale(1.045);
  filter: saturate(1.06) contrast(1.03);
}

.city-card__period {
  position: absolute;
  left: 25px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  height: 25px;
  padding: 0 2px;
  background: rgba(236, 236, 236, .75);
  border: 0;
  border-radius: 5px;
  font-family: Inter, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  box-shadow: none;
}

.city-card h2 {
  width: calc(100% - 54px);
  margin: 6px 0 0 25px;
  padding: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  color: #3a2e1f;
  border: 0;
}

@media (max-width: 900px) {
  .city-card {
    width: 100%;
  }

  .city-card__image-wrap {
    width: 100%;
  }
}

@media (max-width: 760px) {
  .city-card__image-wrap {
    height: 240px;
    border-radius: 28px;
  }

  .city-card__image {
    border-radius: 28px;
  }

  .city-card h2 {
    width: auto;
    margin-left: 0;
    font-size: 26px;
    line-height: 32px;
  }

  .city-card__period {
    left: 18px;
  }
}
</style>