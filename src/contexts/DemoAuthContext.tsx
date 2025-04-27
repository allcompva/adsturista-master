import React, { createContext, useContext, useState } from "react";

interface DemoAuthContextProps {
  user: any;
  setUser: (user: any) => void;
}

const DemoAuthContext = createContext<DemoAuthContextProps | undefined>(
  undefined
);

export const DemoAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  return (
    <DemoAuthContext.Provider value={{ user, setUser }}>
      {children}
    </DemoAuthContext.Provider>
  );
};

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error("useDemoAuth debe ser usado dentro de un DemoAuthProvider");
  }
  return context;
};
