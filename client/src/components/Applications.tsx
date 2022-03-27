import { Paper, Typography } from "@mui/material";
import React from "react";

const Applications: React.FC<{}> = () => {
    return (
        <section className="job-applications">
            <Typography variant="h4">My Job Applications</Typography>
            <Paper variant="outlined"></Paper>
        </section>
    );
};

export default Applications;
