<template>
  <span class="footnote" @mouseleave="opened = false">
    <button
      class="footnote__text"
      type="button"
      @click.stop="opened = !opened"
      @mouseenter="opened = true"
    >
      <slot />
    </button>

    <span v-if="opened && note" class="footnote__popup" @click.stop>
      <span class="footnote__title">{{ note.title || 'Сноска' }}</span>
      <span class="footnote__body">{{ note.text || 'ТЕКСТ СНОСКИ' }}</span>

      <a
        v-if="note.sourceHref"
        :href="note.sourceHref"
        class="footnote__source"
        target="_blank"
        rel="noreferrer"
    >
    </a>
    </span>
  </span>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  note: {
    type: Object,
    default: null
  }
})

const opened = ref(false)
</script>