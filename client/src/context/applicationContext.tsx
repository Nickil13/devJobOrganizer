import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Application } from "../typings/typings";

export type ApplicationContextType = {
    name: string;
    email: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    applications: Application[];

    loadUser: () => void;
    register: (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    createApplication: (application: Application) => void;
    updateApplication: (id: string) => void;

    // deleteApplication: (id: string) => void;
};

export const ApplicationContext =
    React.createContext<ApplicationContextType | null>(null);

const ApplicationProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string>(
        localStorage.getItem("dev-jo-token") || ""
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [applications, setApplications] = useState<Application[]>([]);

    const loadUser = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                "/api/auth/user",
                tokenConfig(token)
            );

            setIsAuthenticated(true);
            setName(data.name);
            setEmail(data.email);
            setApplications([...data.applications]);
            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // If a token exists, but the user hasn't been loaded. Load User.
        if (token && !name) {
            console.log("loading user");
            loadUser();
        }
    }, [loadUser, token, name]);

    const register = async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        } else {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios
                .post("/api/auth/user", { name, email, password }, config)
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const logout = () => {
        setName("");
        setEmail("");
        setIsAuthenticated(false);
        setApplications([]);

        localStorage.removeItem("dev-jo-token");
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "/api/auth",
                { email, password },
                tokenConfig()
            );
            setName(data.user.name);
            setEmail(data.user.email);
            setApplications(data.user.applications);
            setIsAuthenticated(true);

            localStorage.setItem("dev-jo-token", JSON.stringify(data.token));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const createApplication = async (application: Application) => {
        const newApplications = [...applications, application];
        setIsLoading(true);

        try {
            const { data } = await axios.put(
                "/api/auth",
                { applications: newApplications },
                tokenConfig(token)
            );

            setIsLoading(false);
            setApplications([...data.applications]);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const updateApplication = (id: string) => {
        applications?.filter((application: Application) => {
            if (application._id === id) {
                application.stage = "Reviewed";
            }
        });
    };

    const tokenConfig = (token?: string) => {
        type Config = {
            headers: {
                "Content-Type": string;
                Authorization?: string;
            };
        };
        // Headers
        let config: Config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    };

    return (
        <ApplicationContext.Provider
            value={{
                loadUser,
                name,
                email,
                isAuthenticated,
                isLoading,
                applications,
                register,
                login,
                logout,
                createApplication,
                updateApplication,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(ApplicationContext);
};

export default ApplicationProvider;
