import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header2 from '../components/Header2';
import GlobalStyles from '../styles/GlobalStyles';
import TransferenciaPuntosScreen from '../screens/TransferenciaPuntosScreen';
type RootStackParamList = {
    TransferenciaPuntosScreen: undefined;
    PuntosAcumuladosScreen: undefined;
};


const { height: screenHeight } = Dimensions.get('window');
const steps = [
    { id: 1, text: 'Solicita el QR al comercio' },
    { id: 2, text: 'Escanear el código para pagar' },
    { id: 3, text: 'Confirma el monto de la transacción' },
];

const StepsList = () => {
    return (
        <View style={styles.container}>
            {steps.map((step) => (
                <View key={step.id} style={styles.stepContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.circleText}>{step.id}</Text>
                    </View>
                    <Text style={styles.stepText}>{step.text}</Text>
                </View>
            ))}
        </View>
    );
};

type PuntosAcumuladosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PuntosAcumuladosScreen'>;
interface Props {
    navigation: PuntosAcumuladosScreenNavigationProp;
}
const PuntosAcumuladosScreen: React.FC<Props> = ({ navigation }) => {
    const [showComponentA, setShowComponentA] = useState(true);
    const [showComponentB, setShowComponentB] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState<string | null>(null);
    function handleScanComplete(data: string): void {
        setModalData(data); 
        setModalVisible(true); 
    }

    const handlePress = () => {
        navigation.navigate('TransferenciaPuntosScreen');
    };
    const handleContinue = () => {
        navigation.navigate('TransferenciaPuntosScreen'); 
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
            {showComponentA && (<View>
                <View style={{ justifyContent: 'flex-start', top: 70, alignItems: 'flex-start', width: '100%', left: '10%' }}>
                    <View style={styles.line} />
                    <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 20, }}>Puntos Acumulados</Text>
                    <Text style={{ fontSize: 36, textAlign: 'left', marginTop: 5, fontWeight: '700' }}>725</Text>

                    <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 24, color: 'orange', fontWeight: '700', marginBottom: 25 }}>¿Cómo pagar con tus puntos?</Text>
                    {steps.map((step, index) => (
                        <View key={step.id}>
                            <View style={styles.stepContainer}>
                                <View style={styles.circle}>
                                    <Text style={styles.circleText}>{step.id}</Text>
                                </View>
                                <Text style={styles.stepText}>{step.text}</Text>
                            </View>
                            {index === 0 && (
                                <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                                    <Image
                                        style={styles.logoIcon}
                                        resizeMode="cover"
                                        source={require('../assets/images/imgComercio.png')}
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={ (handlePress) }>
                        <Text style={styles.buttonText}>Escanear código QR</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', bottom: -30, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('TransferenciaPuntosScreen')}>
                        <Text style={GlobalStyles.buttonIconTextBold}> Historial de transacciones</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
            {showComponentB && (
                <View>

                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
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
    camera: {
        width: '80%',  
        height: '30%', 
        position: 'absolute',
        top: '40%',
        borderRadius: 15,
    },
    line: {
        height: 4, 
        backgroundColor: '#d0d0d0',
        width: '100%',
        marginVertical: 10, 
        left: '-10%'
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
    container: {
        padding: 20,
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

export default PuntosAcumuladosScreen;
