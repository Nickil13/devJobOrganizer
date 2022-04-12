import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utilities/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/dashboard/*"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
