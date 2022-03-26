import { AccountCircle } from "@mui/icons-material";
import {
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Typography,
} from "@mui/material";
import React from "react";

export default function Login() {
    return (
        <div>
            <Container>
                <div className="login">
                    <Paper className="login-card" variant="outlined">
                        <div className="login-banner">
                            <Typography variant="h3">
                                Dev Job Organizer
                            </Typography>
                        </div>
                        <form>
                            <FormControl fullWidth>
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    name="email"
                                    type="email"
                                    sx={{ mb: 3 }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    type="password"
                                />
                            </FormControl>
                            <Button sx={{ my: 2 }}>Login</Button>
                        </form>
                    </Paper>
                    <div></div>
                </div>
            </Container>
        </div>
    );
}
