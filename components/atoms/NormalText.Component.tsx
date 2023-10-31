import {StyleSheet, Text, TextProps} from "react-native";

export const NormalText: React.FC<TextProps & {text: string}> = (props) => {
    return (
        <Text style={{...style.text}} {...props} >
            {props.text}
        </Text>
    );
}

const style = StyleSheet.create({
    text: {
        fontFamily: 'poppins'
    }
})