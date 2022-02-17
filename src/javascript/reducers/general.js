import { PAINT, SELL } from '../constants/ActionTypes'

const initialState = {
  clicksToPainting: 6,
  clicksDone: 0,
  paintingsDone: 0,
  moneyGained: 0
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case PAINT:
      const newState = Object.assign({}, state)

      newState.clicksDone += 1

      if (newState.clicksDone == newState.clicksToPainting) {
        newState.clicksDone = 0
        newState.paintingsDone += 1
      }

      console.log(state, newState)
      return newState

    case SELL:
      state.paintingsDone = -1
      state.moneyGained = +1
      return state

    default:
      return state
  }
}
