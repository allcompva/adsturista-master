import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../MainNavigator/types";
import GlobalStyles from "../styles/GlobalStyles";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoScreen'>;
const Header2: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handlePressInfo = () => {
        navigation.navigate('InfoScreen');
    };
    const handlePress = () => {
        navigation.navigate('PuntosAcumuladosScreen'); 
    };
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={GlobalStyles.buttonWithIcon}
                onPress={() => navigation.navigate('FormScreen')}>
                <Image
                    source={require('../assets/images/volver.png')}  
                    style={GlobalStyles.buttonIcon}
                />
                <Text style={GlobalStyles.buttonIconText}>Ir al inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        left: 20,
        bottom: -10,
      }


});

export default Header2;
