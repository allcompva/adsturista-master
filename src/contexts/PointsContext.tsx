import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Canje {
  id: string;
  fecha: string;
  promocion: string;
  puntos: number;
  comercio: string;
}

interface PointsContextType {
  points: number;
  canjes: Canje[];
  updatePoints: (newPoints: number) => void;
  addCanje: (canje: Canje) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [points, setPoints] = useState(15680); // Puntos iniciales
  const [canjes, setCanjes] = useState<Canje[]>([]);

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedPoints = await AsyncStorage.getItem("@user_points");
        const savedCanjes = await AsyncStorage.getItem("@user_canjes");

        if (savedPoints) {
          setPoints(parseInt(savedPoints, 10));
        }

        if (savedCanjes) {
          setCanjes(JSON.parse(savedCanjes));
        }
      } catch (error) {
        console.error("Error cargando datos guardados:", error);
      }
    };

    loadSavedData();
  }, []);

  const updatePoints = async (newPoints: number) => {
    try {
      console.log("Actualizando puntos a:", newPoints);
      setPoints(newPoints);
      await AsyncStorage.setItem("@user_points", newPoints.toString());
    } catch (error) {
      console.error("Error guardando puntos:", error);
    }
  };

  const addCanje = async (canje: Canje) => {
    try {
      console.log("Agregando nuevo canje:", canje);
      const newCanjes = [...canjes, canje];
      setCanjes(newCanjes);
      await AsyncStorage.setItem("@user_canjes", JSON.stringify(newCanjes));
    } catch (error) {
      console.error("Error guardando canje:", error);
    }
  };

  const contextValue = {
    points,
    canjes,
    updatePoints,
    addCanje,
  };

  return (
    <PointsContext.Provider value={contextValue}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
};
