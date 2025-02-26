import { createContext, useContext } from "react";
import { checkSession } from "../api";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext({
    data: null,
    isLoading: false,
    isError: false,
});

function AuthProvider({ children }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["session"],
        queryFn: checkSession,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return (
        <AuthContext.Provider value={{ data, isLoading, isError }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };