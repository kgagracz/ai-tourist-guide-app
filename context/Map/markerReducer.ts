import _ from 'lodash'
import { Marker } from '../../models/Marker'

export enum MarkerActionTypes {
    ADD_MARKER = 'ADD_MARKER',
    REMOVE_MARKER = 'REMOVE_MARKER',
    CLEAR_MARKERS = 'CLEAR_MARKERS'
}

type AddMarker = {type: MarkerActionTypes.ADD_MARKER, payload: Marker[]}
type RemoveMarker = {type: MarkerActionTypes.REMOVE_MARKER, payload: Marker[]}
type ClearMarkers = {type: MarkerActionTypes.CLEAR_MARKERS}

type MarkerActions = AddMarker | RemoveMarker | ClearMarkers

export const markerReducer = (state: Marker[], action: MarkerActions) => {
  switch (action.type) {
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
