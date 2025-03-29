import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import MainNavigator from './src/MainNavigator/MainNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin'; 
import { AuthProvider } from './src/contexts/AuthContext'; 

export default function App() {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '572084472316-2e9m0s0o6ibmdqgivk4rj3t0jjpjq86q.apps.googleusercontent.com', 
      offlineAccess: true, 
    });
  }, []); 

  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
