import IUser from "@/interfaces/User";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

export const api = axios.create({
    baseURL: `${STORAGE_URL}/api`,
});

interface IAuthContextProps {
    user?: IUser;
    setAsLogged: (token: string) => void;
    logout: () => void;
    setUserData: (updatedUser: IUser) => void;
    token: string | null;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>();
    const [token, setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = () => {
            const savedToken = localStorage.getItem("ACCESS_TOKEN");
            if (savedToken) {
                axios
                    .get(`${STORAGE_URL}/auth/user`, {
                        headers: {
                            Authorization: `Bearer ${savedToken}`,
                        },
                    })
                    .then(({ data: authUser }) => {
                        api.interceptors.request.use((config) => {
                            config.headers.Authorization = `Bearer ${savedToken}`;
                            return config;
                        });
                        setUser(authUser);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        };

        if (token) {
            getUser();
        }
    }, [token]);

    const setAsLogged = (newToken: string) => {
        localStorage.setItem("ACCESS_TOKEN", newToken);
        setToken(newToken);
    };

    const setUserData = (updatedUser: IUser) => {
        setUser(updatedUser); 
    };

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        setToken(null);
        setUser(undefined);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, setAsLogged, logout, token, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
