import _ from 'lodash'
import { Marker } from '../../models/Marker'

export enum MarkerActionTypes {
    ADD_MARKER = 'ADD_MARKER',
    REMOVE_MARKER = 'REMOVE_MARKER',
    CLEAR_MARKERS = 'CLEAR_MARKERS',
    SET_MARKERS = 'SET_MARKERS',
}

type AddMarker = {type: MarkerActionTypes.ADD_MARKER, payload: Marker[]}
type RemoveMarker = {type: MarkerActionTypes.REMOVE_MARKER, payload: Marker[]}
type ClearMarkers = {type: MarkerActionTypes.CLEAR_MARKERS}
type SetMarkers = {type: MarkerActionTypes.SET_MARKERS, payload: Marker[]}

type MarkerActions = AddMarker | RemoveMarker | ClearMarkers | SetMarkers

export const markerReducer = (state: Marker[], action: MarkerActions) => {
  switch (action.type) {
    case MarkerActionTypes.SET_MARKERS:
      return action.payload
    case MarkerActionTypes.ADD_MARKER:
      return [...state, action.payload]
    case MarkerActionTypes.REMOVE_MARKER:
      return state.filter((marker) => _.isEqual(marker, action.payload))
    case MarkerActionTypes.CLEAR_MARKERS:
      return []
    default:
      return state
  }
}
