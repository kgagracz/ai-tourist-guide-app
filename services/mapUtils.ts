import { Region } from 'react-native-maps'

export const getBoundByRegion = (region: Region) => ([
  region.latitude - region.latitudeDelta / 2, // southLat - min lat
  region.longitude - region.longitudeDelta / 2, // westLng - min lng
  region.latitude + region.latitudeDelta / 2, // northLat - max lat
  region.longitude + region.longitudeDelta / 2, // eastLng - max lng
])

// export const getBoundByRegion = (region, scale = 1) => {
//   /*
//   * Latitude : max/min +90 to -90
//   * Longitude : max/min +180 to -180
//   */
//   // Of course we can do it mo compact but it wait is more obvious
//   const calcMinLatByOffset = (lng, offset) => {
//     const factValue = lng - offset
//     if (factValue < -90) {
//       return (90 + offset) * -1
//     }
//     return factValue
//   }
//
//   const calcMaxLatByOffset = (lng, offset) => {
//     const factValue = lng + offset
//     if (factValue > 90) {
//       return (90 - offset) * -1
//     }
//     return factValue
//   }
//
//   const calcMinLngByOffset = (lng, offset) => {
//     const factValue = lng - offset
//     if (factValue < -180) {
//       return (180 + offset) * -1
//     }
//     return factValue
//   }
//
//   const calcMaxLngByOffset = (lng, offset) => {
//     const factValue = lng + offset
//     if (factValue > 180) {
//       return (180 - offset) * -1
//     }
//     return factValue
//   }
//
//   const latOffset = region.latitudeDelta / 2 * scale
//   const lngD = (region.longitudeDelta < -180) ? 360 + region.longitudeDelta : region.longitudeDelta
//   const lngOffset = lngD / 2 * scale
//
//   return [
//     calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
//     calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
//     calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
//     calcMaxLatByOffset(region.latitude, latOffset), // northLat - max lat
//   ]
// }
