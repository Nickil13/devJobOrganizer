import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import { ApplicationContext } from "../context/applicationContext";
import { ApplicationContextType } from "../context/applicationContext";
import LinkIcon from "@mui/icons-material/Link";
import PublicIcon from "@mui/icons-material/Public";

const Applications: React.FC<{}> = () => {
    const { applications } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;

    return (
        <section className="job-applications">
            <Typography variant="h4">My Job Applications</Typography>
            <TableContainer component={Paper} className="application-table">
                <Table aria-label="application table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Loc</TableCell>
                            <TableCell>Stage</TableCell>
                            <TableCell>URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{application.name}</TableCell>
                                    <TableCell>
                                        {application.position}
                                    </TableCell>
                                    <TableCell>{application.date}</TableCell>
                                    <TableCell>
                                        {application.location.city}
                                        {application.location.remote &&
                                            " (REMOTE)"}
                                    </TableCell>
                                    <TableCell>{application.stage}</TableCell>
                                    <TableCell>
                                        <a
                                            href={application.listingURL}
                                            target="_blank"
                                        >
                                            <LinkIcon />
                                        </a>
                                        <a
                                            href={application.websiteURL}
                                            target="_blank"
                                        >
                                            <PublicIcon />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default Applications;
