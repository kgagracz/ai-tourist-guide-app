import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import {useNavigation, useTheme} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SavedAttraction } from '../../../models/SavedAttraction';
import { NormalText } from '../../atoms/NormalText';
import { BoldText } from '../../atoms/BoldText';
import { Button } from '../../atoms/Button';
import { useMapContext } from '../../../context/Map/MapContext';
import { parseLocationToRegion } from '../Map/Map.util';
import { Marker } from '../../../models/Marker';
import {ThemeType, useScheme} from "../SchemeContext/SchemeProvider";

type SavedAttractionListItemProps = {
  attraction: SavedAttraction
}

export const SavedAttractionListItem = ({ attraction }: SavedAttractionListItemProps) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { location, name, city } = attraction
  const { latitude, longitude } = location
  const { setMapRegion, addMarker } = useMapContext()
  const { scheme } = useScheme()
  const { colors } = useTheme()

  const onGoToAttractionButtonClick = () => {
    navigation.navigate(t('menuMap'));
    // @ts-ignore
    const region = parseLocationToRegion({
      coords: { latitude, longitude },
    });
    const marker: Marker = {
      title: name,
      description: city,
      coordinate: {
        latitude,
        longitude,
      },
    };
    addMarker(marker);
    setMapRegion(region);
  }

  const styles = makeStyles(colors)

  return (
      <View style={styles.container}>
        <View>
          <BoldText style={styles.itemName}>{name}</BoldText>
          <NormalText style={styles.itemName}>{city}</NormalText>
        </View>
        <View style={styles.iconsBox}>
          <Icon name="close" size={36} style={styles.itemName} />
          <Icon name="close" size={36} style={styles.itemName} />
          <Button onPress={onGoToAttractionButtonClick} icon={<Icon name="chevron-right" size={36} style={styles.itemName} />} />
        </View>
      </View>
  );
}

const makeStyles = (color: ThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      borderBottomWidth: 1,
      padding: 10,
      flex: 1,
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemName: {
      color: color.text,
    },
    iconsBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
}
