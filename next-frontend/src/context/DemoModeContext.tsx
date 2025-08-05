import React, { createContext, useContext, useState } from "react";

type DemoModeContextType = {
    demoMode: boolean;
    setDemoMode: (value: boolean) => void;
};

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [demoMode, setDemoMode] = useState(false);

    return (
        <DemoModeContext.Provider value={{ demoMode, setDemoMode }}>
            {children}
        </DemoModeContext.Provider>
    );
};

export const useDemoMode = () => {
    const context = useContext(DemoModeContext);
    if (!context) {
        throw new Error("useDemoMode must be used within a DemoModeProvider");
    }
    return context;
};
