import {
  PAINT,
  SELL,
  STUDIOUPDATE,
  HIRING,
  AUTOSELL,
  CHANGEBLOCK,
  GALLERYWORKING,
  CHANGEPAGE,
  GETORIGINAL,
  CHANGEPHASE,
  GETPHRASE,
  SAVE,
  LOAD,
  RESET,
  STUDY,
  BUYUPGRADE,
  DAD
} from '../constants/ActionTypes'

import { baseState } from '../data/initialState.jsx'
import { phases, phrases } from '../data/phases.jsx'
import colors from '../../stylesheets/colors.scss'

const studioSize = 100
const initialState = Object.assign({}, baseState)

const randn_bm = (min, max) => {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0)
    // num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    num = randn_bm(min, max)
  // resample between 0 and 1 if out of range
  else {
    // num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
  // return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

const getPictureCost = (state, quality, refCost, study) => {
  let factor = 0
  const studioUpdate = state.studioUpdate

  let cost = 0
  if (refCost == 1) {
    cost = (1 + factor) * quality
  } else {
    cost = refCost * study * (1 + factor) * quality
  }
  cost *= state.factor + cost
  return cost
}

const paint = (ref, skill, luck) => {
  const refQ = ref.quality ? ref.quality : 1
  let qual = 0
  //Чем больше скилл, тем меньше качество...(
  if (!ref.referense) {
    qual = Math.min(1, Math.random() * refQ) //(Math.floor(Math.random() * refQ * 1000) / 100) * skill
  } else {
    // const max = 0.3 - 0.25 * luck
    // qual = randn_bm(skill, max)
    // // console.log(qual)
    //
    // qual = refQ * Math.abs(qual)
    qual = Math.min(1, Math.random() * skill * refQ)
    // console.log(refQ, skill, qual)
  }

  return {
    status: 11,
    quality: Math.min(1, Math.max(1e-2, qual)),
    referense: ref.referense ? ref.referense : ref
  }
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case PAINT: {
      const newState = Object.assign({}, state)
      const paintings = newState.paintings[0]
      const references = newState.paintings[1]
      let ref = action.ref
      let picture = {}
      let click = 0

      if (newState.clicksDone == 0) {
        if (!ref) {
          //картна при обычнойм рисовании
          if (references.length == 0) {
            ref = newState.originals[0]
            newState.clicksToPainting = 1
          } else {
            const ref_id = Math.floor(Math.random() * references.length)
            ref = references[ref_id]
            newState.clicksToPainting = Math.floor(ref.quality * 100)
          }
        } else {
          //картина при обучении
          newState.clicksToPainting = Math.floor(100 * newState.study.skill)
        }

        picture = paint(ref, newState.study.skill, newState.luck)
        paintings.unshift(picture)
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
        paintings.length < studioSize
      ) {
        newState.statistics.totalPainting += 1
        newState.clicksDone = 0

        picture = paintings[0]
        picture.status = 0
      }
      return newState
    }

    case SELL: {
      const newState = Object.assign({}, state)
      let dillers = newState.units[1]
      let paint = newState.paintings[0][action.id]
      if (paint.status == 0) {
        paint.status = 10
        paint.timeToSale = newState.speedOfSale
        paint.timeFraction = paint.timeToSale / newState.speedOfSale
      } else {
        let money = getPictureCost(
          newState,
          paint.quality,
          paint.referense.cost,
          newState.study.skill
        )
        newState.moneyGained += money

        if (paint.autoSell) {
          dillers.working -= 1
          delete paint.autoSell
        }

        newState.paintings[0].splice([action.id], 1)
        newState.statistics.totalSales += 1
        newState.statistics.totalMoneys += money
      }
      return newState
    }

    case STUDIOUPDATE: {
      const newState = Object.assign({}, state)
      const studioUpdate = newState.studioUpdate[action.id]

      if (newState.moneyGained >= studioUpdate.cost) {
        newState.moneyGained -= studioUpdate.cost
        studioUpdate.level += 1
      } else {
        console.log('error', newState.moneyGained, studioUpdate.cost)
      }
      studioUpdate.cost = Math.floor(
        studioUpdate.baseCost * 1.15 ** studioUpdate.level
      )
      return newState
    }

    case HIRING: {
      const newState = Object.assign({}, state)
      const unit = newState.units[action.id]
      let isActive = unit.isActive
      isActive = action.id == 0 && unit.size <= unit.level ? false : isActive
      if (isActive) {
        if (newState.moneyGained >= unit.cost) {
          newState.moneyGained -= unit.cost
          unit.level += 1
        } else {
          console.log('error', newState.moneyGained, unit.cost)
        }
        const modif = action.id == 0 ? 8.15 : 1.15
        unit.cost = Math.floor(unit.baseCost * modif ** unit.level)
      } else {
        console.log(unit, 'не доступен')
      }
      return newState
    }

    case BUYUPGRADE: {
      const newState = Object.assign({}, state)
      const upg = newState.upgrade[action.id]
      let obj = {}
      let mod = 0
      if (upg.cost <= newState.moneyGained) {
        newState.moneyGained -= upg.cost
        newState.upgrade.splice([action.id], 1)
        if (upg.prop == 'luck') {
          newState.luck *= upg.modifier
        } else if (upg.prop == 'students') {
          newState.units[0].size += upg.modifier
        } else if (upg.prop == 'diller') {
          newState.units[1].speed *= upg.modifier
        } else if (upg.prop == 'offline') {
          newState.offlineSpeed *= upg.modifier
        } else if (upg.prop == 'gallery') {
          newState.paintings[2].push({ size: 3, pictures: [] })
        }
      }
      return newState
    }

    case AUTOSELL: {
      const newState = Object.assign({}, state)
      let dillers = newState.units[1]
      let pictures = newState.paintings[0]
      let picture = {}
      if (dillers.working < dillers.level) {
        for (let i = 0; i < pictures.length; i++) {
          const j = pictures.length - i - 1
          if (pictures[j].status == 0) {
            console.log('SELL START')
            dillers.working += 1
            pictures[j].status = 10
            pictures[j].timeToSale = dillers.speed
            pictures[j].autoSell = true
            break
          }
        }
      }
      return newState
    }

    case CHANGEBLOCK: {
      const newState = Object.assign({}, state)
      const fullId = action.id.split('/')

      const id = Number(fullId[fullId.length - 1])
      const oldBlockId = fullId[0] == 'r' ? 1 : fullId[0] == 's' ? 0 : 2
      const newBlockId =
        action.newBlock == 'r' ? 1 : action.newBlock == 's' ? 0 : 2

      let oldBlock = {}
      let newBlock = {}

      if (oldBlockId != 2) {
        oldBlock = newState.paintings[oldBlockId]
      } else {
        oldBlock =
          newState.paintings[oldBlockId][action.id.split('/')[1]].pictures
      }
      if (newBlockId != 2) {
        newBlock = newState.paintings[newBlockId]
      } else {
        newBlock = newState.paintings[2][action.newBlock.split('/')[1]].pictures
      }

      newBlock.unshift(oldBlock[id])
      oldBlock.splice(id, 1)

      if (oldBlockId != 2) {
        newState.paintings[oldBlockId] = oldBlock
      } else {
        newState.paintings[oldBlockId][
          action.id.split('/')[1]
        ].pictures = oldBlock
      }
      if (newBlockId != 2) {
        newState.paintings[newBlockId] = newBlock
      } else {
        newState.paintings[2][action.newBlock.split('/')[1]].pictures = newBlock
      }

      console.log(oldBlock, newBlock)
      return newState
    }

    case STUDY: {
      let newState = Object.assign({}, state)

      let study = newState.study
      const cost = (action.picture.cost * 1.15 ** study.studyCount) / 100

      if (newState.moneyGained >= cost) {
        newState.moneyGained -= cost
        if (!(study.skill >= 1)) {
          study.skill += 0.05 * 0.5 ** study.studyCount
        }
        study.studyCount += 1

        newState.paintings[0].forEach((item, i) => {
          if (item.status == 11) {
            newState.paintings[0].splice(i, 1)
          }
        })
        newState.clicksDone = 0
        newState = general(newState, {
          type: PAINT,
          ref: action.picture,
          sourse: 0
        })
      }
      return newState
    }

    case GETORIGINAL: {
      let newState = Object.assign({}, state)
      const original = newState.originals[action.id + 1]
      if (newState.moneyGained >= original.cost) {
        const picture = { status: 1, quality: 1, referense: original }
        newState.paintings[1].unshift(picture)
        newState.moneyGained -= original.cost
        newState.statistics.totalOriginals += 1
      } else {
        console.log('ERROR')
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
          galleryCost += getPictureCost(
            newState,
            picture.quality,
            picture.referense.cost,
            newState.study.skill
          )

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
        console.log(newState.openGalleryId)
        newState.openGalleryId = action.page_id ? action.galleryId : null
        console.log(newState.openGalleryId)
      }
      return newState
    }

    case CHANGEPHASE: {
      const newState = Object.assign({}, state)
      const statistics = newState.statistics
      const skill = newState.study.skill

      if (statistics.totalMoneys < 10) {
        newState.phase = Object.keys(phases)[0]
      } else if (statistics.totalPainting > 20 && skill == 0.01) {
        newState.phase = Object.keys(phases)[2]
      } else if (
        newState.paintings[1].length >= 1 &&
        newState.units[0].level == 0
      ) {
        newState.units[0].isActive = true
        newState.phase = Object.keys(phases)[4]
      } else if (statistics.totalSales > 100 && newState.units[1].level == 0) {
        newState.units[1].isActive = true
        newState.phase = Object.keys(phases)[5]
      } else if (statistics.totalOriginals > 0) {
        newState.phase = Object.keys(phases)[7]
        newState.galleriesIsActive = true
      } else if (
        (newState.study.studyCount > 0 && newState.paintings[1].length < 1) ||
        (statistics.totalSales < 100 && newState.study.studyCount < 0) ||
        (newState.units[1].level == 0 && newState.units[0].level > 0) ||
        (newState.units[0].level > 0 && newState.units[1].level > 0)
      ) {
        newState.phase = Object.keys(phases)[0]
      } else {
        newState.phase = Object.keys(phases)[0]
      }
      return newState
    }

    case GETPHRASE: {
      const newState = Object.assign({}, state)
      if (newState.phraseCounter < 10) {
        newState.phraseCounter += 1
      } else {
        newState.phrase = newState.phase
        // newState.phrase = phases[0].key
        // newState.phrase = phrases[Math.floor(Math.random() * phrases.length)]
        // newState.phraseCounter = 0
      }
      return newState
    }

    case SAVE: {
      const newState = Object.assign({}, state)
      const f = () => {
        newState.saveCounter = 0
        newState.saveTime = new Date().getTime()
        localStorage.setItem('save', JSON.stringify(newState))
        newState.phrase = 'Сохранение'
        console.log('save')
      }
      if (action.isHandle) {
        f()
      } else if (newState.saveCounter == 60) {
        f()
      } else {
        newState.saveCounter += 1
        general(newState, { type: GETPHRASE })
      }
      return newState
    }

    case LOAD: {
      let newState = Object.assign({}, state)
      if (localStorage.save) {
        newState = JSON.parse(localStorage.save)
      }

      const colors = ['green', 'yellow', 'ping', 'blue']
      const color = colors[Math.floor(Math.random() * colors.length)]
      const game = document.getElementsByClassName('Game')[0]
      game.classList.add(color)

      const offlineSpeed = newState.offlineSpeed
      // const offlineSpeed = 1

      console.log('...')
      const seconds = Math.floor(
        (new Date().getTime() - newState.saveTime) * 0.001 * offlineSpeed
      )
      console.log('денег до симуляии', newState.moneyGained)
      console.log('картин до симуляии', newState.paintings[0].length)
      console.log('секунд прошло', seconds / offlineSpeed)

      if (seconds > 0) {
        let ref = newState.originals[0]
        // ref.referense = ref
        // ref.quality = 1
        const salesSpped = newState.units[1].speed * newState.units[1].level
        const paintinsSales =
          salesSpped > 0 ? Math.floor(seconds / salesSpped) : 0
        const secondsForNewSale = seconds - paintinsSales * salesSpped

        const paintSpeed = newState.units[0].level * newState.units[0].pps
        const clicks = paintSpeed > 0 ? Math.floor(seconds / paintSpeed) : 0

        let picCkick = 0
        const references = newState.paintings[1]
        references.map((paint) => {
          picCkick += Math.floor(1 * paint.quality * 100)
        })
        picCkick = picCkick / references.length //средне количество кликов на картину

        const painting =
          picCkick > 0 ? Math.floor((seconds * paintSpeed) / picCkick) : 0
        const clickNewPicture = clicks > 0 ? clicks - painting * picCkick : 0

        let money = 0
        for (let i = 0; i < paintinsSales && paintinsSales > 0; i++) {
          ref =
            references.length > 0
              ? references[Math.floor(Math.random() * references.length)]
              : ref
          const pic = paint(ref, newState.study.skill, newState.luck)
          money += Math.floor(
            getPictureCost(
              newState,
              pic.quality,
              pic.referense.cost,
              newState.study.skill
            )
          )
        }

        if (
          newState.clicksDone + clickNewPicture >= newState.clicksToPainting &&
          newState.paintings[0].length < studioSize
        ) {
          console.log('LOLOLOLOLOL')
          for (let i = 0; newState.paintings[0][i].status == 11; i++) {
            newState.paintings[0][i].status = 0
          }
          newState.clicksDone =
            newState.clicksDone + clickNewPicture - newState.clicksToPainting

          ref =
            references.length > 0
              ? references[Math.floor(Math.random() * references.length)]
              : ref
          newState.paintings[0].unshift(
            paint(ref, newState.study.skill, newState.luck)
          )

          newState.statistics.totalPainting += 1
        } else if (
          newState.clicksDone + clickNewPicture <=
          newState.clicksToPainting
        ) {
          newState.clicksDone = newState.clicksDone + clickNewPicture
        }
        let paints = []
        for (
          let i = 0;
          i < painting - paintinsSales &&
          newState.paintings[0].length + paints.length < studioSize;
          i++
        ) {
          ref =
            references.length > 0
              ? references[Math.floor(Math.random() * references.length)]
              : ref
          paints.push(paint(ref, newState.study.skill, newState.luck))
        }
        paints = paints.map((p) => {
          p.status = 0
          newState.paintings[0].unshift(p)
        })
        //из остатоков кликов и секунд продажи дорисовать и допродовать картины + галерея

        console.log(
          'пока вас не было ученики нариосвали',
          painting,
          'картин, а диллеры заработали $',
          money
        )

        newState.moneyGained += money
        newState.statistics.totalClick += clicks
        newState.statistics.totalMoneys += money
        newState.statistics.totalSales += paintinsSales
        newState.statistics.totalPainting += paints.length
      }

      newState.loading = false
      return newState
    }

    case RESET: {
      const newState = Object.assign({}, baseState)
      localStorage.setItem('save', JSON.stringify(newState))
      return newState
    }

    default:
      return state
  }
}
