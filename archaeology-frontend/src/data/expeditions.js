import { phanagoriaExpeditionContent } from '../content/expeditions/phanagoria'
import { mirmekiyExpeditionContent } from '../content/expeditions/mirmekiy'
import { nimfeyExpeditionContent } from '../content/expeditions/nimfey'
import { olbiaExpeditionContent } from '../content/expeditions/olbia'
import { berezanExpeditionContent } from '../content/expeditions/berezan'
import { kiteyExpeditionContent } from '../content/expeditions/kitey'
import { kalosLimenExpeditionContent } from '../content/expeditions/kalosLimen'
import { feodosiyaExpeditionContent } from '../content/expeditions/feodosiya'
import { otherExpeditionsContent } from '../content/expeditions/other'

export const expeditionItems = [
  {
    id: 1,
    title: 'Фанагорийская экспедиция',
    period: 'С 2004 г. по настоящее время',
    image: null,
    short: 'Одна из крупнейших экспедиций Эрмитажа, ведущая раскопки Фанагории — крупнейшего античного города на Таманском полуострове.',
    content: phanagoriaExpeditionContent
  },
  {
    id: 2,
    title: 'Мирмекийская экспедиция',
    period: 'С 1999 г. по настоящее время',
    image: null,
    short: 'Экспедиция Государственного Эрмитажа ведет непрерывные раскопки Мирмекия — малого боспорского города на северном берегу Керченской бухты.',
    content: mirmekiyExpeditionContent
  },
  {
    id: 3,
    title: 'Нимфейская экспедиция',
    period: 'С 1938 г. по настоящее время',
    image: null,
    short: 'Многолетнее исследование античного города Нимфей на берегу Керченского пролива, ныне связанное с работами Государственного Эрмитажа.',
    content: nimfeyExpeditionContent
  },
  {
    id: 4,
    title: 'Ольвийская экспедиция',
    period: '1901–1935; с 1970-х гг.',
    image: null,
    short: 'Исследование одного из крупнейших античных полисов Северного Причерноморья — Ольвии Понтийской.',
    content: olbiaExpeditionContent
  },
  {
    id: 5,
    title: 'Борисфенская экспедиция (о. Березань)',
    period: 'С 1998 г.',
    image: null,
    short: 'Исследования острова Березань, где находилась самая ранняя греческая колония Северного Причерноморья — Борисфен.',
    content: berezanExpeditionContent
  },
  {
    id: 6,
    title: 'Китейская экспедиция',
    period: 'С 2006 г.',
    image: null,
    short: 'Исследование небольшого, но важного античного города Китей на Керченском полуострове.',
    content: kiteyExpeditionContent
  },
  {
    id: 7,
    title: 'Калос-Лименская экспедиция',
    period: 'С 2008 г.',
    image: null,
    short: 'Раскопки античного города Калос Лимен в Северо-Западном Крыму — красивой гавани Херсонесского государства.',
    content: kalosLimenExpeditionContent
  },
  {
    id: 8,
    title: 'Феодосийская экспедиция',
    period: 'С 2010 г.',
    image: null,
    short: 'Исследование античного поселения на территории Феодосии — важного торгового центра на юго-восточном побережье Крыма.',
    content: feodosiyaExpeditionContent
  },
  {
    id: 9,
    title: 'Исследования других памятников',
    period: 'По состоянию на 2025 г.',
    image: null,
    short: 'Краткий обзор других памятников Северного Причерноморья, входящих в сферу научных интересов Эрмитажа.',
    content: otherExpeditionsContent
  }
]
