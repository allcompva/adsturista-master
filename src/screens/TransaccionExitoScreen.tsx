import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header2 from '../components/Header2';
import GlobalStyles from '../styles/GlobalStyles';

type RootStackParamList = {
    Main: undefined;
    Home: undefined;
};


const { height: screenHeight } = Dimensions.get('window');
const steps = [
    { id: 1, text: 'Solicita el QR al comercio' },
    { id: 2, text: 'Escanear el código para pagar' },
    { id: 3, text: 'Confirma el monto de la transacción' },
];

type TransaccionExitoScreen = StackNavigationProp<RootStackParamList, 'Home'>;
interface Props {
    navigation: TransaccionExitoScreen;
}
const TransaccionExitoScreen: React.FC<Props> = ({ navigation }) => {

    const handlePress = () => {
        navigation.navigate('Home');
    };
    const handleContinue = () => {
        navigation.navigate('Home'); 
    };
    return (
        <ImageBackground
            source={require('../assets/fondo.png')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={GlobalStyles.header}>
                <Header2 />
            </View>

            <View style={{ justifyContent: 'flex-start', top: 70, alignItems: 'flex-start', width: '90%', left: '5%', }}>
                <View style={styles.line} />
                <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 20, }}>Puntos Acumulados</Text>
                <Text style={{ fontSize: 36, textAlign: 'left', marginTop: 5, fontWeight: '700' }}>725</Text>
                <Text style={{
                    fontSize: 20, textAlign: 'center', marginTop: 60, color: 'black', fontWeight: '500', marginBottom: 100,
                    width: '100%'
                }}>
                    Heladería Las Sierras
                </Text>
                <View style={{ borderStyle: 'solid', borderRadius: 15, borderWidth: 2, borderColor: 'gray', height: 100, width: '100%',
                    paddingHorizontal: 10, marginBottom: 80
                 }}>
                    <View style={styles.container}>
                        <Text style={styles.label}>Comercio Solicita</Text>
                        <Text style={styles.value}>500 Puntos</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Puntos Disponibles</Text>
                        <Text style={styles.value}>725 puntos</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Aceptar transferencia</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', bottom: -30, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={ styles.btncan } > Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    btncan:{
        color: 'red',
        fontWeight: '700',
        fontSize: 20
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
      },
      label: {
        fontSize: 16,
        color: 'black',
        flex: 1, 
        textAlign: 'left',
      },
      value: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
      },

    background: {
        paddingTop: 0,
        marginTop: 0,
        flex: 1,
        width: '100%', 
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0,
    },
    logoIcon: {
        width: 300,
        height: 230,
        marginTop: 0,
        marginBottom: 0,
    },
    line: {
        height: 4, 
        backgroundColor: '#d0d0d0',
        width: '100%', 
        marginVertical: 10, 
    },
    buttonContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        maxWidth: '80%',
        marginTop: 110,
    },
    button: {
        backgroundColor: '#ff6b00',
        padding: 10,
        height: 50,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 0,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 500,
    },
    titleContainer: {
        alignItems: 'flex-start',
        textAlign: 'left',
        marginVertical: 0,
        top: '40%',
        marginBottom: 40,
        paddingLeft: 0,
        position: 'absolute',
    },
    titleText: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 0,
    },

    buttonContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: '64%',
    },
   
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    circleText: {
        color: 'white',
        fontWeight: 'bold',
    },
    stepText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 15,
    },
});

export default TransaccionExitoScreen;
