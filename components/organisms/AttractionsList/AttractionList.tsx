import { ScrollView } from 'react-native'
import { AttractionAction } from './AttractionList.Model'
import { Attraction } from '../../../models/Attraction'

type AttractionListProps = {
    attractions: Attraction[]
    attractionMainAction?: AttractionAction
    attractionSubActions?: AttractionAction[]
}

export const AttractionList = ({
  attractions,
  attractionSubActions,
  attractionMainAction,
}: AttractionListProps) => (
  <ScrollView>
    {attractions.map((attraction) => (
      <AttractionListItem
        key={attraction.id}
        attraction={attraction}
        attractionMainAction={attractionMainAction}
        attractionSubActions={attractionSubActions}
      />
    ))}
  </ScrollView>
)
