import pantikapei from '../assets/pantikapei.jpg'
import olbia from '../assets/olbia.png'
import chersonesus from '../assets/chersonesus.png'
import phanagoria from '../assets/phanagoria.png'
import borisfen from '../assets/borisfen.jpg'
import hermonassa from '../assets/hermonassa.jpg'
import gorgippia from '../assets/gorgippia.jpg'
import kalos from '../assets/kalos-limen.jpg'
import kerkinitida from '../assets/kerkinitida.jpg'
import kimmerik from '../assets/kimmerik.jpg'
import kitey from '../assets/kitey.jpg'
import mirmekiy from '../assets/mirmekiy.jpg'
import neapol from '../assets/neapol.jpg'
import nikoniy from '../assets/nikoniy.jpg'
import nimfey from '../assets/nimfey.jpg'
import tanais from '../assets/tanais.jpg'
import tira from '../assets/tira.jpg'
import tiritaka from '../assets/tiritaka.jpg'
import feodosiya from '../assets/feodosiya.jpg'

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
    period: 'VII век до н.э.',
    image: pantikapei,
    lat: 45.3517,
    lng: 36.4714,
    isMajor: true,
    isHermitage: false,
    content: pantikapeyContent
  },
  {
    id: 2,
    slug: 'olbia',
    title: 'Ольвия',
    greek: 'Ὀλβία',
    period: 'VI век до н.э.',
    image: olbia,
    lat: 46.6103,
    lng: 31.5258,
    isMajor: true,
    isHermitage: true,
    content: olbiaContent
  },
  {
    id: 3,
    slug: 'chersonesus',
    title: 'Херсонес',
    greek: 'Χερσόνησος',
    period: 'V век до н.э.',
    image: chersonesus,
    lat: 44.6133,
    lng: 33.4894,
    isMajor: true,
    isHermitage: false,
    content: placeholderCityContent
  },
  {
    id: 4,
    slug: 'phanagoria',
    title: 'Фанагория',
    greek: 'Φαναγόρεια',
    period: 'VI век до н.э.',
    image: phanagoria,
    lat: 45.2439,
    lng: 36.9608,
    isMajor: true,
    isHermitage: false,
    content: phanagoriaContent
  },
  {
    id: 5,
    slug: 'borisfen',
    title: 'Борисфен',
    greek: 'Βορυσθένης',
    period: 'VII век до н.э.',
    image: borisfen,
    lat: 46.6000,
    lng: 31.4400,
    isMajor: false,
    isHermitage: true,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 6,
    slug: 'germonassa',
    title: 'Гермонасса',
    greek: 'Ἡρμόνασσα',
    period: 'VI век до н.э.',
    image: hermonassa,
    lat: 45.2833,
    lng: 36.9833,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 7,
    slug: 'gorgippia',
    title: 'Горгиппия',
    greek: 'Γοργιππία',
    period: 'IV век до н.э.',
    image: gorgippia,
    lat: 44.8997,
    lng: 37.3233,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 8,
    slug: 'kalos-limen',
    title: 'Калос Лимен',
    greek: 'Καλός Λιμήν',
    period: 'IV век до н.э.',
    image: kalos,
    lat: 45.3833,
    lng: 32.7500,
    isMajor: false,
    isHermitage: true,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 9,
    slug: 'kerkinitida',
    title: 'Керкинитида',
    greek: 'Κερκινῖτις',
    period: 'VI век до н.э.',
    image: kerkinitida,
    lat: 45.3333,
    lng: 33.6167,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 10,
    slug: 'kimmerik',
    title: 'Киммерик',
    greek: 'Κιμμερικόν',
    period: 'V век до н.э.',
    image: kimmerik,
    lat: 45.0500,
    lng: 35.8167,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 11,
    slug: 'kitey',
    title: 'Китей',
    greek: 'Κίταιον',
    period: 'V век до н.э.',
    image: kitey,
    lat: 45.0167,
    lng: 35.8833,
    isMajor: false,
    isHermitage: true,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 12,
    slug: 'mirmekiy',
    title: 'Мирмекий',
    greek: 'Μυρμήκιον',
    period: 'VI век до н.э.',
    image: mirmekiy,
    lat: 45.3167,
    lng: 36.4667,
    isMajor: false,
    isHermitage: true,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 13,
    slug: 'neapol-skit',
    title: 'Неаполь Скифский',
    greek: 'Νεάπολις Σκυθική',
    period: 'III век до н.э.',
    image: neapol,
    lat: 44.9333,
    lng: 34.1667,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 14,
    slug: 'nikoniy',
    title: 'Никоний',
    greek: 'Νικώνιον',
    period: 'VI век до н.э.',
    image: nikoniy,
    lat: 46.2167,
    lng: 30.6333,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 15,
    slug: 'nimfey',
    title: 'Нимфей',
    greek: 'Νύμφαιον',
    period: 'VI век до н.э.',
    image: nimfey,
    lat: 45.2667,
    lng: 36.5333,
    isMajor: false,
    isHermitage: true,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 16,
    slug: 'tanais',
    title: 'Танаис',
    greek: 'Τάναϊς',
    period: 'III век до н.э.',
    image: tanais,
    lat: 47.2167,
    lng: 39.3500,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 17,
    slug: 'tira',
    title: 'Тира',
    greek: 'Τύρας',
    period: 'VI век до н.э.',
    image: tira,
    lat: 46.2000,
    lng: 30.3667,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 18,
    slug: 'tiritaka',
    title: 'Тиритака',
    greek: 'Τυριτάκη',
    period: 'VI век до н.э.',
    image: tiritaka,
    lat: 45.3000,
    lng: 36.5000,
    isMajor: false,
    isHermitage: false,
    content: placeholderCityContent,
    isPlaceholder: true
  },
  {
    id: 19,
    slug: 'feodosiya',
    title: 'Феодосия',
    greek: 'Θεοδοσία',
    period: 'VI век до н.э.',
    image: feodosiya,
    lat: 45.0333,
    lng: 35.3833,
    isMajor: false,
    isHermitage: true,
    content: placeholderCityContent,
    isPlaceholder: true
  }
]