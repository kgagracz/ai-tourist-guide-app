import React from 'react';
import { View, Switch, StyleSheet, Text, useColorScheme } from 'react-native';
import { useTheme } from "../ThemeContext/ThemeProvider";

const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    const isEnabled = theme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FFF' }]}>
            <Text style={[styles.text, { color: theme === 'dark' ? '#FFF' : '#000' }]}>Ciemny motyw</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#9ca3ad" }}
                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleTheme}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default SettingsPage;
