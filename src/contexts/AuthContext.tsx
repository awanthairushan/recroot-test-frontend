import {createContext, ReactNode, useState} from "react";
import {DataContextProps} from "../types/types";

export const AuthContext = createContext<{
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
}>({
    isLogged: false,
    setIsLogged: () => {},
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </AuthContext.Provider>
    )
}