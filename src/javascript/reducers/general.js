import {
  PAINT,
  SELL,
  STUDIOUPDATE,
  HIRING,
  AUTOSELL,
  CHANGEBLOCK,
  GALLERYWORKING,
  CHANGEPAGE,
  GETORIGINAL
} from '../constants/ActionTypes'

import { pictures } from '../data/pictures.jsx'

const initialState = {
  pageid: 0,

  clicksToPainting: 1,
  clicksDone: 0,
  speedOfSale: 5,

  study: {
    studyCoast: 1,
    studyCount: 0,
    skill: 0.1
  },
  moneyGained: 10,

  paintings: [
    [],
    [
      {
        referense: {
          id: 1,
          title: 'Натюрморт с битой птицей, медной посудой...',
          author: 'Жан Батист Шарден',
          style: 'Романтизм',
          year: 1728
        },
        status: 1,
        quality: 1
      }
    ],
    [
      {
        size: 3,
        pictures: []
      }
    ]
  ],
  originals: pictures,

  units: [
    {
      level: 0,
      text:
        'Зачем рисовать самому, если можно свалить эту работу на подмастерье',
      baseCost: 10,
      cost: 10,
      pps: 1
    },
    {
      level: 0,
      text: 'Деньги, денежки. Продавайте диллеры скорей.',
      baseCost: 100,
      cost: 100,
      working: 0,
      speed: 60
    }
  ],
  studioUpdate: [
    {
      level: 0,
      cost: 1,
      factor: 1
    },
    {
      level: 0,
      cost: 10,
      factor: 5
    },
    {
      level: 0,
      cost: 100,
      factor: 10
    }
  ],

  statistics: {
    totalClick: 0,
    totalPainting: 0,
    totalSales: 0,
    totalMoneys: 0,
    totalGalleryEarned: 0,

    totalStyles: 2,
    totalAuthors: 10,
    totalYears: 10
  }
}

const getPictureCost = (state, quality) => {
  let factor = 0
  const studioUpdate = state.studioUpdate

  studioUpdate.forEach((i) => (factor += i.factor * i.level))
  const cost = Math.floor((1 + factor) * quality * 1000) / 1000
  return cost
}

const paint = (picture, skill) => {
  let qual = 0
  if (picture.referense.quality) {
    qual = Math.random() * picture.reference.quality
  } else {
    qual = Math.random() / 10
  }

  qual = Math.floor((qual + skill) * 1000) / 1000
  console.log(qual)

  picture['quality'] = qual
  return picture
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case PAINT: {
      const newState = Object.assign({}, state)
      const paintings = newState.paintings[0]
      const references = newState.paintings[1]

      let click = 0
      let ref = {}

      if (newState.clicksDone == 0) {
        if (references.length == 0) {
          ref = newState.originals[0]
          newState.clicksToPainting = 1
        } else {
          const ref_id = Math.floor(Math.random() * references.length)
          newState.clicksToPainting = 1 * references[ref_id].quality * 100
          ref = references[ref_id].referense
        }
        paintings.push({
          status: 11,
          referense: ref
        })
      }

      if (action.sourse == 0) {
        newState.statistics.totalClick += 1
        click = 1
      } else {
        click = newState.units[0].level * newState.units[0].pps
      }
      newState.clicksDone += click

      if (
        newState.clicksDone >= newState.clicksToPainting &&
        paintings.length < 200
      ) {
        newState.statistics.totalPainting += 1
        newState.clicksDone = 0

        let picture = paintings[paintings.length - 1]
        picture = paint(picture, newState.study.skill)
        picture['status'] = 0
      }
      return newState
    }

    case SELL: {
      const newState = Object.assign({}, state)
      let dillers = newState.units[1]
      let paint = newState.paintings[0][action.id]

      if (paint.status == 0) {
        newState.paintings[0][action.id].status = 10
        newState.paintings[0][action.id].time_to_sale = newState.speedOfSale
      } else {
        newState.moneyGained += getPictureCost(
          newState,
          state.paintings[0][action.id].quality
        )
        if (dillers.working > 0) {
          dillers.working -= 1
        }
        newState.paintings[0].splice([action.id], 1)
        newState.statistics.totalSales += 1
        newState.statistics.totalMoneys += newState.moneyGained
      }
      return newState
    }

    case STUDIOUPDATE: {
      const newState = Object.assign({}, state)
      const studioUpdate = newState.studioUpdate[action.id]
      if (newState.moneyGained >= studioUpdate.cost) {
        newState.moneyGained -= studioUpdate.cost
        studioUpdate.level += 1
        studioUpdate.cost += 1
      } else {
        console.log(
          'error',
          newState.moneyGained,
          newState.studioUpdate[action.id]
        )
      }
      return newState
    }

    case HIRING: {
      const newState = Object.assign({}, state)
      const unit = newState.units[action.id]
      if (action.id == 0) {
        newState.clicksToPainting = newState.clicksToPainting / 2
      }
      if (newState.moneyGained >= unit.cost) {
        newState.moneyGained -= unit.cost
        unit.level += 1
      } else {
        console.log('error', newState.moneyGained, unit.cost)
      }
      unit.cost = Math.floor(unit.baseCost * 1.15 ** unit.level)
      return newState
    }

    case AUTOSELL: {
      const newState = Object.assign({}, state)
      let dillers = newState.units[1]
      let pictures = newState.paintings[0]
      let picture = {}
      if (dillers.working == 0) {
        for (let i = 0; i < pictures.length; i++) {
          if (pictures[i].status == 0) {
            dillers.working += 1
            pictures[i].status = 10
            pictures[i].time_to_sale = dillers.speed / dillers.level
            break
          }
        }
      }
      return newState
    }

    case CHANGEBLOCK: {
      const newState = Object.assign({}, state)

      let sourse = []

      if (action.status != 2) {
        sourse = newState.paintings[action.status]
      } else {
        sourse = newState.paintings[action.status][0].pictures
      }
      let picture = {}
      picture = sourse[action.id]
      picture.status = action.newStatus
      sourse.splice([action.id], 1)

      if (action.newStatus != 2) {
        newState.paintings[action.newStatus].push(picture)
      } else {
        newState.paintings[action.newStatus][0].pictures.push(picture)
      }

      return newState
    }

    case GETORIGINAL: {
      const newState = Object.assign({}, state)
      let study = newState.study

      if (newState.moneyGained >= study.studyCoast) {
        study.studyCount += 1
        study.skill += 0.001
        newState.moneyGained -= study.studyCoast
        let picture = {}

        picture = paint(
          {
            referense: action.id,
            status: 1
          },
          study.skill
        )

        newState.paintings[1].push(picture)
      }

      return newState
    }

    case GALLERYWORKING: {
      const newState = Object.assign({}, state)
      const galleries = newState.paintings[2]

      const totalStyles = newState.statistics.totalStyles
      const totalAuthors = newState.statistics.totalAuthors
      const totalY = newState.statistics.totalYears

      let c = 0

      galleries.forEach((gallery, i) => {
        const picturesInGallery = gallery.pictures.length
        let galleryCost = 0
        let styles = {}
        let style_entropy = 0
        let authors = {}
        let author_entropy = 0
        let years = {}
        let year_entropy = 0

        gallery.pictures.forEach((picture, i) => {
          galleryCost += getPictureCost(newState, picture.quality)

          if (styles[picture.referense.style]) {
            styles[picture.referense.style] += 1
          } else {
            styles[picture.referense.style] = 1
          }
          if (authors[picture.referense.author]) {
            authors[picture.referense.author] += 1
          } else {
            authors[picture.referense.author] = 1
          }
          if (years[picture.referense.year]) {
            years[picture.referense.year] += 1
          } else {
            years[picture.referense.year] = 1
          }
        })

        for (let key in styles) {
          let style_i = styles[key] / picturesInGallery
          style_entropy += style_i * Math.log(style_i)
        }
        for (let key in authors) {
          let style_i = authors[key] / picturesInGallery
          author_entropy += style_i * Math.log(style_i)
        }
        for (let key in years) {
          let style_i = years[key] / picturesInGallery
          year_entropy += style_i * Math.log(style_i)
        }

        style_entropy = 1 + style_entropy / 2 / Math.log(totalStyles)
        author_entropy = 1 + author_entropy / 2 / Math.log(totalAuthors)
        year_entropy = 1 + year_entropy / 2 / Math.log(totalY)

        c +=
          ((0.01 *
            (0.6 * style_entropy + 0.3 * author_entropy + 0.1 * year_entropy)) /
            60) *
          galleryCost
      })

      newState.moneyGained += c
      newState.statistics.totalMoneys += c
      newState.statistics.totalGalleryEarned += c
      return newState
    }

    case CHANGEPAGE: {
      const newState = Object.assign({}, state)
      if (action.page_id == newState.pageid) {
        newState.pageid = 0
      } else {
        newState.pageid = action.page_id
      }
      return newState
    }

    default:
      return state
  }
}
