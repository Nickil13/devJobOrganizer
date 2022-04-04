import React, { useState } from "react";
import {
    Button,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import PieChartIcon from "@mui/icons-material/PieChart";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material";
import {
    ApplicationContext,
    ApplicationContextType,
} from "../context/applicationContext";
import ApplicationModal from "./ApplicationModal";

const drawerWidth: number = 240;

const Sidebar: React.FC<{}> = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { logout } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;

    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <Drawer
            variant="permanent"
            className="drawer-desktop"
            sx={{
                display: { xs: "none", sm: "block" },
                flexShrink: { sm: 0 },
                width: { sm: drawerWidth },
            }}
            open
        >
            <List>
                <Link to="/dashboard">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/analytics">
                    <ListItem button>
                        <ListItemIcon>
                            <PieChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Stack Analytics" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/map">
                    <ListItem button>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Jobs Map" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <Button onClick={() => setIsDialogOpen(true)}>
                Add Application
            </Button>
            <ApplicationModal
                closeDialog={closeDialog}
                isDialogOpen={isDialogOpen}
            />
            <Box className="sidebar-footer">
                <List>
                    <Link to="/dashboard/account">
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItem>
                    </Link>
                    <Link to="/">
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Link>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
