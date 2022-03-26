import React from "react";
import { Navbar } from "../components";
import { Container, Paper, Typography } from "@mui/material";

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <Container>
                <div className="job-applications">
                    <Typography variant="h4">My Job Applications</Typography>
                    <Paper variant="outlined"></Paper>
                </div>
            </Container>
        </div>
    );
}
