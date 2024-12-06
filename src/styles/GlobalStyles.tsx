import { Dimensions } from 'react-native';
import { ScaledSheet, s, vs, ms } from 'react-native-size-matters';

const { height: screenHeight } = Dimensions.get('window');
const GlobalStyles = ScaledSheet.create({
    logo: {
        backgroundColor: 'transparent',
        width: 120, // Ajusta el ancho según tu imagen
        height: 95, // Ajusta la altura según tu imagen
        top: 50,
    },

    // Contenedor principal
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '0@s', // Escala horizontalmente
    },
    gradient: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        height: screenHeight, // Ocupa toda la altura de la pantalla
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
        backgroundColor: 'transparent', // Color de fondo para el encabezado
        position: 'absolute',
        top: '7%',
    },
    // Estilo para Título
    title: {
        fontSize: '24@s', // Escala horizontalmente
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginBottom: '10@vs', // Escala verticalmente
    },

    // Estilo para Subtítulo
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
    // Estilo para Párrafo
    paragraph: {
        fontSize: '16@ms', // Escala en función del ancho y altura
        color: '#333',
        lineHeight: '24@vs', // Espaciado entre líneas
        textAlign: 'justify',
        marginBottom: '12@vs',
    },
    paragraphCenter: {
        fontSize: '16@ms', // Escala en función del ancho y altura
        color: '#333',
        lineHeight: '24@vs', // Espaciado entre líneas
        marginBottom: '12@vs',
        textAlign: 'center',
    },
    // Caja de texto para ingreso de datos
    inputBox: {
        width: '100%',  // Abarca todo el ancho del contenedor padre
        paddingVertical: '10@vs',  // Padding vertical responsivo
        paddingHorizontal: '12@s',  // Padding horizontal
        fontSize: '16@ms',  // Texto escalable
        borderWidth: '1@s',  // Borde fino y responsivo
        borderColor: '#lightgray',  // Color de borde suave
        borderRadius: '8@s',  // Bordes redondeados
        marginBottom: '15@vs',  // Separación entre inputs
        backgroundColor: '#fff',  // Fondo blanco
        color: 'gray',  // Color del texto
    },
    inputBoxFocused: {
        borderColor: '#007bff',  // Cambia el color del borde al enfocarse
    },
    // Estilo para Botones
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

    // Estilo para Etiquetas
    label: {
        fontSize: '14@ms',
        color: '#666',
        marginBottom: '4@vs',
    },

    // Estilo para Menú
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

    // Botón con imagen a la izquierda y texto a la derecha
    buttonWithIcon: {
        flexDirection: 'row',  // Imagen y texto en línea horizontal
        alignItems: 'center',  // Alineación vertical centrada
        paddingVertical: '12@vs',  // Padding vertical responsivo
        paddingHorizontal: '20@s', // Padding horizontal responsivo
        backgroundColor: 'transparent',
        borderRadius: '8@s',
        marginTop: '10@vs',
    },
    buttonIcon: {
        width: '24@s',  // Tamaño de la imagen
        height: '24@s',
        marginRight: '12@s',  // Espacio entre la imagen y el texto
    },
    buttonIconText: {
        fontSize: '16@ms',  // Texto escalable
        color: 'black',
        fontWeight: '600',
    },
    buttonIconTextBold: {
        fontSize: '15@ms',  // Texto escalable
        color: 'black',
        fontWeight: '700',
    },
    // Estilo para el combo de selección
    pickerContainer: {
        width: '100%',  // Ocupa todo el ancho disponible
        borderWidth: '1@s',
        borderColor: '#ddd',
        borderRadius: '8@s',
        paddingVertical: '10@vs',  // Padding vertical responsivo
        paddingHorizontal: '12@s',
        backgroundColor: '#fff',
        marginBottom: '10@vs',
    },
    pickerText: {
        fontSize: '16@ms',
        color: '#333',
    },
    pickerFocused: {
        borderColor: '#007bff',  // Borde azul al enfocar
    },
});

export default GlobalStyles;
