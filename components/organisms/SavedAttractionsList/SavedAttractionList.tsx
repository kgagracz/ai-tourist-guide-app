import { ScrollView } from 'react-native'
import { SavedAttraction } from '../../../models/SavedAttraction'
import { SavedAttractionListItem } from './SavedAttractionListItem'

type SavedAttractionListProps = {
    savedAttractions: SavedAttraction[]
}

export const SavedAttractionList = ({ savedAttractions }: SavedAttractionListProps) => (
  <ScrollView>
    {savedAttractions.map((attraction) => (
      <SavedAttractionListItem
        key={attraction.id}
        attraction={attraction}
      />
    ))}
  </ScrollView>
)
