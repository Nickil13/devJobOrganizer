import {
    CircularProgress,
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Stack,
} from "@mui/material";
import React from "react";
import {
    ApplicationContext,
    ApplicationContextType,
} from "../context/applicationContext";
import { useParams } from "react-router-dom";
import { ApplicationParams } from "../typings/typings";
import { FaReact, FaNodeJs } from "react-icons/fa";

const ApplicationDetails: React.FC<{}> = () => {
    const { applications, isLoading } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;
    const { id } = useParams<ApplicationParams>();
    const currentApplication = applications.find(
        (application) => application._id === id
    );

    return (
        <section>
            {isLoading ? (
                <CircularProgress />
            ) : currentApplication ? (
                <Container>
                    <Typography variant="h4">
                        {currentApplication.name}
                    </Typography>
                    <Typography variant="h5">
                        {currentApplication.position}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Date"
                                    secondary={currentApplication.date}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Location"
                                    secondary={
                                        <>
                                            <span>
                                                {
                                                    currentApplication.location
                                                        .city
                                                }
                                                ,{" "}
                                                {
                                                    currentApplication.location
                                                        .province
                                                }
                                            </span>
                                            <span>
                                                {
                                                    currentApplication.location
                                                        .address
                                                }
                                            </span>
                                            <span>
                                                {
                                                    currentApplication.location
                                                        .postalCode
                                                }
                                            </span>

                                            {currentApplication.location
                                                .remote && <span>REMOTE</span>}
                                        </>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Stage"
                                    secondary={currentApplication.stage}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Stack"
                                    secondary={
                                        <>
                                            <FaNodeJs />
                                            <FaReact />
                                        </>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Stack>
                    <Paper variant="outlined">
                        <Typography variant="h6">Notes</Typography>
                        <Typography variant="body1">
                            {currentApplication.notes}
                        </Typography>
                    </Paper>
                </Container>
            ) : (
                <p>Application not found.</p>
            )}
        </section>
    );
};

export default ApplicationDetails;
