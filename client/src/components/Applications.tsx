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

import { useNavigate } from "react-router-dom";

const Applications: React.FC<{}> = () => {
    const { applications } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;
    const navigate = useNavigate();

    const onRowClick =
        (applicationID: string) =>
        (e: React.MouseEvent<HTMLTableRowElement>) => {
            navigate(`/dashboard/application/${applicationID}`);
        };

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications?.map((application, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    onClick={onRowClick(application._id || "")}
                                >
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
