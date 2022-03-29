import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import applicationData from "../data.json";

interface Application {
    _id: number;
    name: string;
    position: string;
    date: string;
    location: {
        city: string;
        province: string;
        address?: string;
        postalCode?: string;
        remote: boolean;
    };
    stack: string[];
    stage: string;
    listingURL: string;
    websiteURL: string;
    notes: string[];
}

export type ApplicationContextType = {
    name: string;
    email: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    applications: Application[];
    register: (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => void;
    login: (email: string, password: string) => void;
    createApplication: (application: Application) => void;
    updateApplication: (id: number) => void;
    // getApplication: (id: number) => Application;
    // deleteApplication: (id: number) => void;
    error: string;
};

export const ApplicationContext =
    React.createContext<ApplicationContextType | null>(null);

const ApplicationProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        localStorage.getItem("dev-jo-token") !== null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [applications, setApplications] = useState<Application[]>([
        ...applicationData,
    ]);
    const [error, setError] = useState<string>("");

    const register = async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
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
    const login = async (email: string, password: string) => {
        setError("");
        console.log("login", email, password);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "/api/auth",
                { email, password },
                config
            );
            console.log(data);
            setName(data.user.name);
            setEmail(data.user.email);
            setIsAuthenticated(true);
            localStorage.setItem("dev-jo-token", data.token);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            // setError(error);
        }
    };
    const createApplication = (application: Application) => {
        const newApplication: Application = {
            _id: Math.random(),
            name: application.name,
            position: application.position,
            date: application.date,
            location: {
                city: application.location.city,
                province: application.location.province,
                address: application.location.address,
                postalCode: application.location.postalCode,
                remote: application.location.remote,
            },
            stack: application.stack,
            stage: application.stage,
            listingURL: application.listingURL,
            websiteURL: application.websiteURL,
            notes: [],
        };

        setApplications([...applications, newApplication]);
    };

    const updateApplication = (id: number) => {
        applications?.filter((application: Application) => {
            if (application._id === id) {
                application.stage = "Reviewed";
            }
        });
    };

    return (
        <ApplicationContext.Provider
            value={{
                name,
                email,
                isAuthenticated,
                isLoading,
                applications,
                register,
                login,
                createApplication,
                updateApplication,
                error,
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
