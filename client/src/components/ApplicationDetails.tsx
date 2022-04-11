import {
    CircularProgress,
    Container,
    Paper,
    Typography,
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
import LinkIcon from "@mui/icons-material/Link";
import PublicIcon from "@mui/icons-material/Public";

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
                    <div>
                        <a
                            href={currentApplication.listingURL}
                            target="_blank"
                            rel="noreferrer"
                            className="link-icon"
                        >
                            <LinkIcon />
                        </a>
                        <a
                            href={currentApplication.websiteURL}
                            target="_blank"
                            rel="noreferrer"
                            className="link-icon"
                        >
                            <PublicIcon />
                        </a>
                    </div>
                    <Stack direction="column" spacing={2} sx={{ my: 3 }}>
                        <div>
                            <Typography variant="h6">Date</Typography>
                            <Typography variant="body1">
                                {currentApplication.date}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6">Location</Typography>
                            <>
                                {currentApplication.location.remote && (
                                    <span className="tag">remote</span>
                                )}
                                <ul className="job-location">
                                    <li>
                                        {currentApplication.location.city},{" "}
                                        {currentApplication.location.province}
                                    </li>
                                    <li>
                                        {currentApplication.location.address}
                                    </li>
                                    <li>
                                        {currentApplication.location.postalCode}
                                    </li>
                                </ul>
                            </>
                        </div>
                        <div>
                            <Typography variant="h6">Stage</Typography>
                            <Typography variant="body1">
                                {currentApplication.stage}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6">Stack</Typography>
                            <Box sx={{ mt: 1 }}>
                                {currentApplication.stack.map((name, index) => {
                                    const item = stackData.find(
                                        (item) => item.name === name
                                    );
                                    if (item) {
                                        const { icon } = item;
                                        return (
                                            <span
                                                className="stack-icon"
                                                key={index}
                                            >
                                                {icon}
                                            </span>
                                        );
                                    }

                                    return name;
                                })}
                            </Box>
                        </div>
                    </Stack>
                    <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
                        <Typography variant="h6">Notes</Typography>
                        <Typography variant="body1">
                            {currentApplication.notes &&
                                (currentApplication.notes.length || <i>...</i>)}
                        </Typography>
                    </Paper>
                    <Box sx={{ mt: 3 }}>
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
