import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './src/MainNavigator/MainNavigator';
import * as SQLite from 'expo-sqlite';
import { AuthProvider } from './src/contexts/AuthContext'; // Ajusta la ruta según tu estructura

export default function App() {

    
    return <AuthProvider><MainNavigator />;</AuthProvider>
    
 
}
