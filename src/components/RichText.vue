<template>
  <div class="rich-text">
    <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
      <h2 v-if="block.type === 'heading'" class="rich-text__heading">
        {{ block.text }}
      </h2>

      <ul v-else-if="block.type === 'list'" class="rich-text__list">
        <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
          <template v-for="(part, partIndex) in item.parts" :key="partIndex">
            <FootnoteTip v-if="part.note" :note="notes[part.note]">
              {{ part.text }}
            </FootnoteTip>
            <template v-else>{{ part.text }}</template>
          </template>
        </li>
      </ul>

      <p v-else>
        <template v-for="(part, partIndex) in block.parts" :key="partIndex">
          <FootnoteTip v-if="part.note" :note="notes[part.note]">
            {{ part.text }}
          </FootnoteTip>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </template>
  </div>
</template>

<script setup>
import FootnoteTip from './FootnoteTip.vue'

defineProps({
  blocks: {
    type: Array,
    required: true
  },
  notes: {
    type: Object,
    default: () => ({})
  }
})
</script>