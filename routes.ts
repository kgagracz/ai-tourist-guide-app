import { Home } from './screens/Home/Home'
import { SavedAttractions } from './screens/SavedAttractions/SavedAttractions'

export const routes = [
  {
    name: 'Home',
    component: Home,
    modals: [
      { name: 'SavedAttractions', component: SavedAttractions },
    ],
  },
]
