import {createContext, ReactNode, useState} from "react";

export const AuthContext = createContext<{
    isLogged: boolean;
    removeSession: () => void;
    userId: string;
    setSession: (value: string) => void;

}>({
    isLogged: false,
    removeSession: () => {
    },
    userId: "",
    setSession: () => {
    }
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(localStorage.getItem("isLoggedIn") === "yes");
    const [userId, setUserId] = useState<string>(localStorage.getItem("userId") || "");

    const setSession = (newUserId: string) => {
        localStorage.setItem("isLoggedIn", "yes");
        localStorage.setItem("userId", newUserId);
        setIsLogged(true);
        setUserId(newUserId);
    }
    const removeSession = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        setIsLogged(false);
        setUserId("");
    }

    return (
        <AuthContext.Provider value={{isLogged, removeSession, userId, setSession}}>
            {children}
        </AuthContext.Provider>
    )
}