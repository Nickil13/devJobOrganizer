import React from "react";
import {
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

const drawerWidth: number = 240;

const Sidebar: React.FC<{}> = () => {
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
        </Drawer>
    );
};

export default Sidebar;
