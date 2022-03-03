import { PAINT, SELL, STUDIOUPDATE, HIRING } from '../constants/ActionTypes'

const initialState = {
  clicksToPainting: 6,
  clicksDone: 0,
  paintingsDone: 0,
  moneyGained: 10,
  units: [
    { level: 0, cost: 10, pps: 1 },
    { level: 0, cost: 100, speed: 10 }
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
  ]
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case PAINT: {
      const newState = Object.assign({}, state)
      newState.clicksDone += 1
      if (newState.clicksDone == newState.clicksToPainting) {
        if (newState.paintingsDone < 200) {
          newState.clicksDone = 0
          newState.clicksToPainting += 1
          newState.paintingsDone += 1
          console.log(newState)
        }
      }
      return newState
    }

    case SELL: {
      const newState = Object.assign({}, state)
      const studioUpdate = newState.studioUpdate
      let factor = 0
      studioUpdate.forEach((i) => (factor += i.factor * i.level))
      newState.paintingsDone -= 1
      newState.moneyGained += 1 + factor
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
      if (newState.moneyGained >= unit.cost) {
        newState.moneyGained -= unit.cost
        unit.level += 1
        unit.cost += 50
      } else {
        console.log('error', newState.moneyGained, unit.cost)
      }
      return newState
    }

    default:
      return state
  }
}
