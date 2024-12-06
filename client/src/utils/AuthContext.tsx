import React, { createContext, useState, useContext } from "react";

// Define the context value type
interface AuthContextType {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    setLoggedIn: () => { }
});

// Hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Define the AuthProvider component
interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};