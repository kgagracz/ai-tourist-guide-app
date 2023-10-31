import {Image, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {NormalText} from "../../components/atoms/NormalText.Component";
import {BoldText} from "../../components/atoms/BoldText.Component";

export const HomeScreen = () => {
    return (
        <View>
            <NormalText style={styles.helloText} text={'Witaj! Znajdujesz się w mieście...'}/>
            <BoldText style={styles.currentCityName} text={'Kraków'}/>
            <Image source={require('../../assets/images/cracow.jpg')} style={styles.currentCityImage}/>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    helloText: {
        fontSize: 16,
        marginTop: 70,
        textAlign: 'center'
    },
    currentCityName: {
        fontSize: 28,
        textAlign: 'center'
    },
    currentCityImage: {
        height: 400,
        objectFit: 'cover',
    }
});
