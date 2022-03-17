import {
  PAINT,
  SELL,
  STUDIOUPDATE,
  HIRING,
  AUTOSELL,
  CHANGEBLOCK,
  GALLERYWORKING
} from '../constants/ActionTypes'

const initialState = {
  clicksToPainting: 2,
  clicksDone: 0,
  speedOfSale: 5,
  paintings: [
    [],
    [
      {
        referense: {
          id: 1,
          title: '111',
          author: '111',
          style: '222',
          year: 111
        },
        status: 1,
        quality: 1
      }
    ],
    [
      {
        size: 3,
        pictures: [
          {
            referense: {
              id: 1,
              title: '111',
              author: '111',
              style: '111',
              year: 111
            },
            status: 2,
            quality: 1
          }
        ]
      }
    ]
  ],
  originals: [{ title: '111', author: '111', style: '111', year: 111 }],
  moneyGained: 100,
  units: [
    { level: 0, cost: 10, pps: 1 },
    { level: 0, cost: 100, working: 0, speed: 60 }
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
    totalClick: 1,
    totalPainting: 1,
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

export default function general(state = initialState, action) {
  switch (action.type) {
    case PAINT: {
      const newState = Object.assign({}, state)
      let click = 0
      if (action.sourse == 0) {
        newState.statistics.totalClick += 1
        click = 1
      } else {
        click = newState.units[0].level * newState.units[0].pps
      }
      newState.clicksDone += click
      if (
        newState.clicksDone >= newState.clicksToPainting &&
        newState.paintings[0].length < 200
      ) {
        const references = newState.paintings[1]
        newState.statistics.totalPainting += 1
        newState.clicksDone = 0
        newState.clicksToPainting += 1
        const ref_id = Math.floor(Math.random() * references.length)
        const qual =
          Math.floor(Math.random() * references[ref_id].quality * 100) / 100
        newState.paintings[0].push({
          quality: qual,
          status: 0,
          referense: references[ref_id].referense
        })
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
        unit.cost += 50
      } else {
        console.log('error', newState.moneyGained, unit.cost)
      }
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
          }
          break
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

    default:
      return state
  }
}
