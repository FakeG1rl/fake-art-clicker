import * as types from '../constants/ActionTypes'

export const paint = () => ({ type: types.PAINT })
export const sell = () => ({ type: types.SELL })
export const studioUpdate = (id) => ({ type: types.STUDIOUPDATE, id: id })
export const hiring = (id) => ({ type: types.HIRING, id: id })
