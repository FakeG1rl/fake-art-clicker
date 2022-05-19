import { pictures } from './pictures.jsx'
import { phases, phrases } from './phases.jsx'
import { upgrade } from './upgrade.jsx'

const cash = 200000
const pcituresSallin = 200

export const baseState = {
  saveTime: new Date().getTime(),
  loading: true,
  offlineSpeed: 0.1,
  pageid: 0,
  phase: Object.keys(phases)[1],
  phrase: Object.keys(phases)[1],
  phraseCounter: 0,
  saveCounter: 0,

  clicksToPainting: 1,
  clicksDone: 0,
  speedOfSale: 5,

  study: {
    // studyCoast: 10,
    studyCount: 0,
    skill: 0.01
  },
  luck: 0.01,
  factor: 0,
  moneyGained: cash,

  paintings: [
    [],
    [
      // {
      //   referense: pictures[1],
      //   status: 1,
      //   quality: 1
      // }
    ],
    [
      {
        size: 3,
        pictures: []
      }
    ]
  ],
  galleriesIsActive: false,
  openGalleryId: null,
  originals: pictures,

  units: [
    {
      level: 0,
      text:
        'Зачем рисовать самому, если можно свалить эту работу на подмастерье',
      baseCost: 10,
      cost: 10,
      size: 5,
      pps: 1,
      isActive: false
    },
    {
      level: 0,
      text: 'Деньги, денежки. Продавайте диллеры скорей.',
      baseCost: 100,
      cost: 100,
      working: 0,
      speed: 60,
      isActive: false
    }
  ],
  studioUpdate: [
    {
      level: 0,
      cost: 5,
      baseCost: 5,
      factor: 1
    },
    {
      level: 0,
      cost: 100,
      baseCost: 100,
      factor: 10
    },
    {
      level: 0,
      cost: 300,
      baseCost: 300,
      factor: 100
    }
  ],
  upgrade: upgrade,
  statistics: {
    start: new Date().getTime(),
    totalClick: pcituresSallin,
    totalPainting: pcituresSallin,
    totalOriginals: 0,
    totalSales: pcituresSallin,
    totalMoneys: cash,
    totalGalleryEarned: 0,

    totalStyles: 4,
    totalAuthors: 4,
    totalYears: 4
  }
}
