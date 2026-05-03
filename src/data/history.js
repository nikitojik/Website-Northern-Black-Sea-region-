import placeholder from '../assets/placeholder.png'
import { historyDescriptions, placeholderHistoryDescription } from '../content/historyContent'

function descriptionFor(id) {
  return historyDescriptions[id] || placeholderHistoryDescription
}

export const historyItems = [
  {
    id: 1,
    title: 'История 1',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(1)
  },
  {
    id: 2,
    title: 'История 2',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(2)
  },
  {
    id: 3,
    title: 'История 3',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(3)
  },
  {
    id: 4,
    title: 'История 4',
    period: 'Период',
    image: placeholder,
    isPlaceholder: true,
    ...descriptionFor(4)
  }
]