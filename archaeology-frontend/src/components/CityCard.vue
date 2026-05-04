<template>
  <article class="city-card city-card--clickable" @click="handleClick">
    <img :src="city.image" :alt="city.title" class="city-card__image">

    <div class="city-card__body">
      <div class="city-card__head">
        <h3>{{ city.title }}</h3>
        <span>{{ city.greek }}</span>
      </div>

      <p>{{ city.content?.short || 'КРАТКОЕ ОПИСАНИЕ' }}</p>
    </div>
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