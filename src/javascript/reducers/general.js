import { PAINT, SELL } from '../constants/ActionTypes'

const initialState = [
  {
    clicksToPainting: 6,
    clicksDone: 0,
    paintingsDone: 0,
    moneyGained: 0
  }
]

let newState = Object.assign({}, initialState)

export default function general(state = initialState, action) {
  switch (action.type) {
    case PAINT:
      state.clicksDone = +1
      if (state.clicksDone == state.clicksToPainting) {
        state.clicksDone = 0
        state.paintingsDone += 1
      }
      console.log(state)
      return state

    case SELL:
      state.paintingsDone = -1
      state.moneyGained = +1
      return state

    default:
      return state
  }
}
