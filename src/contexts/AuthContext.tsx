import React, { createContext, useContext, useState } from 'react';

// Define el tipo de datos del usuario
interface User {
  displayName: string;
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Crea el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
