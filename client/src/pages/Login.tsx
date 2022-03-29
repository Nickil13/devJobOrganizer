import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { ApplicationContext } from "../context/applicationContext";
import { ApplicationContextType } from "../context/applicationContext";
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

export default function Login() {
    const { login, error } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange =
        (type: string) =>
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            if (type === "email") {
                setEmail(event.target.value);
            }

            if (type === "password") {
                setPassword(event.target.value);
            }
        };

    const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
        // ): Promise<any> => {
        e.preventDefault();
        try {
            login(email, password);
            console.log("logging in");
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }

        // try {
        //     await login(email, password);
        //     console.log("logging in");
        //     navigate("/dashboard");
        // } catch (error) {
        //     console.log(error);
        // }
    };
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
                        <form onSubmit={submitForm}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-email">
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    name="outlined-adornment-email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange("email")}
                                    sx={{ mb: 3 }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    name="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handleChange("password")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button sx={{ my: 2 }} type="submit">
                                Login
                            </Button>
                        </form>
                    </Paper>
                    <div></div>
                </div>
            </Container>
        </div>
    );
}
