import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [constEmployeeId, setConstEmployeeId] = useState(null);

    return (
        <AppContext.Provider value={{ constEmployeeId, setConstEmployeeId }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
