import * as types from '../constants/ActionTypes'

export const paint = (sourse, ref = null) => ({
  type: types.PAINT,
  sourse: sourse,
  ref: ref
})
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
export const study = (id) => ({ type: types.STUDY, picture: id })
export const getOriginal = (id) => ({ type: types.GETORIGINAL, id: id })
export const buyUpgrade = (id) => ({ type: types.BUYUPGRADE, id: id })
export const chandePage = (pageId) => ({
  type: types.CHANGEPAGE,
  page_id: pageId
})
export const chandePhase = () => ({
  type: types.CHANGEPHASE
})
export const getPhrase = () => ({
  type: types.GETPHRASE
})
export const save = (isHandle = false) => ({
  type: types.SAVE,
  isHandle: isHandle
})
export const load = () => ({
  type: types.LOAD
})
export const reset = () => ({
  type: types.RESET
})
