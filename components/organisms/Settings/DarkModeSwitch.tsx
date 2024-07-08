import {Appearance, StyleSheet, Switch, Text} from "react-native";
import { useScheme } from "../SchemeContext/SchemeProvider";
import React from "react";
import {Theme, useTheme} from "@react-navigation/native";
import {ThemeType} from "../SchemeContext/SchemeProvider";

export const DarkModeSwitch = ({}) => {
    const { colors, toggleTheme } = useTheme();
    const { scheme, toggleScheme } = useScheme();
    const isDarkEnabled = scheme === 'dark';

    const styles = makeStyles(colors)

    return (
        <>
            <Text style={[styles.text]}>Ciemny motyw</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#9ca3ad" }}
                thumbColor={isDarkEnabled ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={toggleScheme}
                value={isDarkEnabled}
            />
        </>
    )
}

const makeStyles = (color: ThemeType) => {
    return StyleSheet.create({
        text: {
            color: color.text,
            fontSize: 18,
            marginBottom: 10,
        },
    });
}
