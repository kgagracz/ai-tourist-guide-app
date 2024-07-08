import { IconNode } from 'react-native-elements/dist/icons/Icon'
import { Attraction } from '../../../models/Attraction'

export type AttractionAction = {
    icon?: IconNode
    onPress?: (attraction: Attraction) => void
}
