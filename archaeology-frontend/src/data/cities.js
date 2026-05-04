import pantikapei from '../assets/pantikapei.jpg'
import olbia from '../assets/olbia.png'
import chersonesus from '../assets/chersonesus.png'
import phanagoria from '../assets/phanagoria.png'
import placeholder from '../assets/placeholder.png'

import { pantikapeyContent } from '../content/cities/pantikapey'
import { olbiaContent } from '../content/cities/olbia'
import { phanagoriaContent } from '../content/cities/phanagoria'
import { placeholderCityContent } from '../content/cities/placeholderCity'

export const cities = [
  {
    id: 1,
    slug: 'pantikapey',
    title: 'Пантикапей',
    greek: 'Παντικάπαιον',
    image: pantikapei,
    content: pantikapeyContent
  },
  {
    id: 2,
    slug: 'olbia',
    title: 'Ольвия',
    greek: 'Ὀλβία',
    image: olbia,
    content: olbiaContent
  },
  {
    id: 3,
    slug: 'chersonesus',
    title: 'Херсонес',
    greek: 'Χερσόνησος',
    image: chersonesus,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 4,
    slug: 'phanagoria',
    title: 'Фанагория',
    greek: 'Φαναγόρεια',
    image: phanagoria,
    content: phanagoriaContent
  },
  ...Array.from({ length: 15 }, (_, index) => {
    const id = index + 5

    return {
      id,
      slug: `city-${id}`,
      title: `Город ${id}`,
      greek: 'В разработке',
      image: placeholder,
      content: placeholderCityContent,
      isPlaceholder: true
    }
  })
]