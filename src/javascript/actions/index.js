import * as types from '../constants/ActionTypes'

export const paint = (sourse) => ({ type: types.PAINT, sourse: sourse })
export const sell = (id) => ({ type: types.SELL, id: id })
export const studioUpdate = (id) => ({ type: types.STUDIOUPDATE, id: id })
export const hiring = (id) => ({ type: types.HIRING, id: id })
export const autoSell = () => ({ type: types.AUTOSELL })
export const changeblock = (id, status, newStatus) => ({
  type: types.CHANGEBLOCK,
  id: id,
  status: status,
  newStatus: newStatus
})

export const galleryWorking = () => ({ type: types.GALLERYWORKING })
export const getOriginal = (id) => ({ type: types.GETORIGINAL, id: id })
export const chandePage = (pageId) => ({
  type: types.CHANGEPAGE,
  page_id: pageId
})
