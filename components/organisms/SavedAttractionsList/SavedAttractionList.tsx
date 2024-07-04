import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SavedAttraction } from '../../../models/SavedAttraction';
import { SavedAttractionListItem } from './SavedAttractionListItem';
import { useTheme } from '../ThemeContext/ThemeProvider';

type SavedAttractionListProps = {
    savedAttractions: SavedAttraction[]
}

export const SavedAttractionList = ({ savedAttractions }: SavedAttractionListProps) => {
    const { theme } = useTheme();

    return (
        <ScrollView contentContainerStyle={styles.scrollView} style={{ backgroundColor: theme === 'dark' ? '#333' : '#FFF' }}>
            {savedAttractions.map((attraction) => (
                <SavedAttractionListItem
                    key={attraction.id}
                    attraction={attraction}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
});
