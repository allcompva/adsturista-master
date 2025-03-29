import { Dimensions } from 'react-native';
import { ScaledSheet, s, vs, ms } from 'react-native-size-matters';

const { height: screenHeight } = Dimensions.get('window');
const GlobalStyles = ScaledSheet.create({
    logo: {
        backgroundColor: 'transparent',
        width: 120, 
        height: 95, 
        top: 50,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '0@s', 
    },
    gradient: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        height: screenHeight,
    },
    tabViewContainer: {
        flex: 1,
        top: '16%',
        marginLeft: '4%',
        marginRight: '4%',
        width: '92%',
      },
    header: {
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'transparent', 
        position: 'absolute',
        top: '7%',
    },
    title: {
        fontSize: '24@s', 
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginBottom: '10@vs', 
    },

    subtitle: {
        fontSize: '20@s',
        fontWeight: '600',
        color: '#4d4d4d',
        marginBottom: '8@vs',
    },
    subtitleCenter: {
        fontSize: '20@s',
        fontWeight: '600',
        color: '#4d4d4d',
        marginBottom: '8@vs',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '16@ms', 
        color: '#333',
        lineHeight: '24@vs', 
        textAlign: 'justify',
        marginBottom: '12@vs',
    },
    paragraphCenter: {
        fontSize: '16@ms', 
        color: '#333',
        lineHeight: '24@vs', 
        marginBottom: '12@vs',
        textAlign: 'center',
    },
    inputBox: {
        width: '100%',  
        paddingVertical: '10@vs',  
        paddingHorizontal: '12@s',  
        fontSize: '16@ms',  
        borderWidth: '1@s',  
        borderColor: '#lightgray',  
        borderRadius: '8@s',  
        marginBottom: '15@vs',  
        backgroundColor: '#fff', 
        color: 'gray',  
    },
    inputBoxFocused: {
        borderColor: '#007bff',  
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        borderRadius: '8@s',
        alignItems: 'center',
        marginTop: '10@vs',
    },
    buttonText: {
        fontSize: '16@s',
        color: '#fff',
        fontWeight: '600',
    },

    label: {
        fontSize: '14@ms',
        color: '#666',
        marginBottom: '4@vs',
    },

    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: '12@vs',
        backgroundColor: '#e0e0e0',
    },
    menuItem: {
        fontSize: '18@s',
        color: '#333',
    },

    buttonWithIcon: {
        flexDirection: 'row',  
        alignItems: 'center',  
        paddingVertical: '12@vs',  
        paddingHorizontal: '20@s', 
        backgroundColor: 'transparent',
        borderRadius: '8@s',
        marginTop: '10@vs',
    },
    buttonIcon: {
        width: '24@s',  
        height: '24@s',
        marginRight: '12@s',  
    },
    buttonIconText: {
        fontSize: '16@ms',  
        color: 'black',
        fontWeight: '600',
    },
    buttonIconTextBold: {
        fontSize: '15@ms',  
        color: 'black',
        fontWeight: '700',
    },
    pickerContainer: {
        width: '100%',  
        borderColor: '#ddd',
        borderRadius: '8@s',
        paddingVertical: '10@vs',  
        paddingHorizontal: '12@s',
        backgroundColor: '#fff',
        marginBottom: '10@vs',
    },
    pickerText: {
        fontSize: '16@ms',
        color: '#333',
    },
    pickerFocused: {
        borderColor: '#007bff', 
    },
});

export default GlobalStyles;
