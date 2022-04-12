import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Application } from "../typings/typings";

const LOCAL_TOKEN = "dev-jo-token";

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
    updateApplication: (id: string, application: Application) => void;

    deleteApplication: (id: string) => void;
};

export const ApplicationContext = React.createContext<ApplicationContextType>(
    null!
);

const ApplicationProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string>(
        localStorage.getItem(LOCAL_TOKEN) || ""
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
        console.log("authenticated:", isAuthenticated);
    }, [isAuthenticated]);
    useEffect(() => {
        console.log("loading:", isLoading);
    }, [isLoading]);
    useEffect(() => {
        // If a token exists, but the user hasn't been loaded. Load User.
        if (token && !name) {
            console.log("loading user");
            loadUser();
        } else {
            setIsLoading(false);
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
        localStorage.removeItem("dev-jo-token");

        setName("");
        setEmail("");
        setIsAuthenticated(false);
        setApplications([]);
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

            localStorage.setItem(LOCAL_TOKEN, JSON.stringify(data.token));
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

    const updateApplication = async (id: string, application: Application) => {
        const {
            name,
            position,
            date,
            stage,
            stack,
            listingURL,
            websiteURL,
            location: { city, province, address, postalCode, remote },
        } = application;

        const toEdit = applications.find(
            (application) => application._id !== id
        );

        if (toEdit) {
            let newApplications = applications.map((application) => {
                if (application._id === id) {
                    application.name = name;
                    application.position = position;
                    application.date = date;
                    application.stage = stage;
                    application.stack = stack;
                    application.listingURL = listingURL;
                    application.websiteURL = websiteURL;
                    application.location = {
                        city,
                        province,
                        address,
                        postalCode,
                        remote,
                    };
                }
                return application;
            });

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
        } else {
            console.log("couldnt find application");
        }
    };

    const deleteApplication = async (id: string) => {
        const newApplications = applications.filter(
            (application) => application._id !== id
        );

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
                deleteApplication,
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
