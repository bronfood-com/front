import React, { ReactNode, createContext, useState } from 'react';

interface MapWindowState {
    isOpenRestaurant: boolean;
    setIsOpenRestaurant: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapContext = createContext<MapWindowState>({
    isOpenRestaurant: true,
    setIsOpenRestaurant: () => {},
});

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenRestaurant, setIsOpenRestaurant] = useState(true);
    return <MapContext.Provider value={{ isOpenRestaurant, setIsOpenRestaurant }}>{children} </MapContext.Provider>;
};
