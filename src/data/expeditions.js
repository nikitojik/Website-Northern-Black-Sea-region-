import placeholder from '../assets/placeholder.png'
import { expeditionDescriptions, placeholderExpeditionDescription } from '../content/expeditionsContent'

function descriptionFor(id) {
  return expeditionDescriptions[id] || placeholderExpeditionDescription
}

export const expeditionItems = [
  {
    id: 1,
    title: 'Экспедиция 1',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(1)
  },
  {
    id: 2,
    title: 'Экспедиция 2',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(2)
  },
  {
    id: 3,
    title: 'Экспедиция 3',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(3)
  },
  {
    id: 4,
    title: 'Экспедиция 4',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(4)
  }
]