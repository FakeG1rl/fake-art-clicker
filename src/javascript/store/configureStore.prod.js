// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// // import api from '../middleware/api'
// import rootReducer from '../reducers'
//
// const configureStore = (preloadedState) => {
//   console.log('We now use prod store')
//   createStore(rootReducer, preloadedState, applyMiddleware(thunk))
// }
//
// export default configureStore

import { createStore } from 'redux'
import rootReducer from '../reducers'

const configureStore = (preloadedState) => {
  console.log('We now use prod store')
  const store = createStore(rootReducer, preloadedState)

  return store
}

export default configureStore
