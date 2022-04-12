import { Navigate } from "react-router-dom";

import {
    ApplicationContextType,
    useGlobalContext,
} from "../context/applicationContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } =
        useGlobalContext() as ApplicationContextType;

    if (isLoading) {
        return <div>Loading</div>;
    }
    if (!isAuthenticated) {
        // Redirect to the home page
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;
