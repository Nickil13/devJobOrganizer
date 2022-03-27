import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar: React.FC<{}> = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, alignSelf: "center" }}
                    >
                        DevJO
                    </Typography>
                    <IconButton size="large" edge="end" aria-label="menu">
                        <MenuIcon sx={{ display: { sm: "none" } }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
