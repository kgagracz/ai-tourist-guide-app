import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SavedAttraction } from '../../../models/SavedAttraction';
import { SavedAttractionListItem } from './SavedAttractionListItem';
import {ThemeType, useScheme} from '../SchemeContext/SchemeProvider';
import {useTheme} from "@react-navigation/native";

type SavedAttractionListProps = {
    savedAttractions: SavedAttraction[]
}

export const SavedAttractionList = ({ savedAttractions }: SavedAttractionListProps) => {
    const { scheme } = useScheme()
    const { colors } = useTheme()

    const styles = makeStyles(colors)
    return (
        <ScrollView contentContainerStyle={styles.scrollView} style={ styles.container }>
            {savedAttractions.map((attraction) => (
                <SavedAttractionListItem
                    key={attraction.id}
                    attraction={attraction}
                />
            ))}
        </ScrollView>
    );
}

const makeStyles = (color: ThemeType) => {
    return StyleSheet.create({
        container: {
          backgroundColor: color.backgroundColor,
        },
        scrollView: {
            flexGrow: 1,
        },
    });
}

