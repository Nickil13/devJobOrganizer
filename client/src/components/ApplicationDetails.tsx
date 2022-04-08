import {
    CircularProgress,
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Stack,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import {
    ApplicationContext,
    ApplicationContextType,
} from "../context/applicationContext";
import { useNavigate, useParams } from "react-router-dom";
import { ApplicationParams } from "../typings/typings";
import { Box } from "@mui/system";
import EditApplicationModal from "./EditApplicationModal";
import { tech as stackData } from "../stackTech";

const ApplicationDetails: React.FC<{}> = () => {
    const { applications, isLoading, deleteApplication } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;
    const { id } = useParams<ApplicationParams>();
    const navigate = useNavigate();
    const [isEditModalShowing, setIsEditModalShowing] =
        useState<boolean>(false);
    const currentApplication = applications.find(
        (application) => application._id === id
    );

    const handleDelete =
        (id: string | undefined) =>
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (id) {
                deleteApplication(id);
                navigate("/dashboard");
            } else {
                console.log("ID is undefined");
            }
        };
    return (
        <section>
            {isEditModalShowing && (
                <EditApplicationModal
                    closeDialog={() => setIsEditModalShowing(false)}
                    isDialogOpen={isEditModalShowing}
                    currentApplication={currentApplication}
                />
            )}
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
                                            {currentApplication.stack.map(
                                                (name) => {
                                                    const icon = stackData.find(
                                                        (item) =>
                                                            item.name === name
                                                    );
                                                    console.log(icon);
                                                    return name;
                                                }
                                            )}
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
                    <Box sx={{ mt: 1 }}>
                        <Button variant="outlined" onClick={handleDelete(id)}>
                            Delete application
                        </Button>
                        <Button onClick={() => setIsEditModalShowing(true)}>
                            Edit application
                        </Button>
                    </Box>
                </Container>
            ) : (
                <p>Application not found.</p>
            )}
        </section>
    );
};

export default ApplicationDetails;
