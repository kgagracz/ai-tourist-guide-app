import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from "@react-navigation/native";
import {DarkModeSwitch} from "./DarkModeSwitch";

const SettingsPage = () => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <DarkModeSwitch />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingsPage;
