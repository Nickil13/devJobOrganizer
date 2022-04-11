import {
    Analytics,
    ApplicationDetails,
    Applications,
    JobMap,
    Navbar,
    Sidebar,
} from "../components";
import { Container, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Container>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Applications />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/map" element={<JobMap />} />
                            <Route
                                path="/application/:id"
                                element={<ApplicationDetails />}
                            />
                        </Routes>
                    </div>
                </Container>
            </Box>
        </>
    );
}
