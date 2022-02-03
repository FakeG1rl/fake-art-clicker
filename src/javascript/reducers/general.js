import { ADD_TODO } from '../constants/ActionTypes'

const initialState = [
  {
    test: 'Use Redux',
    yo: 'nya'
  }
]

export default function general(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state

    default:
      return state
  }
}
