import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            primary: {
                main: string;
            };
        };
    }

    // allow configuration using `createTheme`
    // interface ThemeOptions {
    //     palette: {
    //         primary: {
    //             main: string;
    //         };
    //     };
    // }
}
export const theme = createTheme({
    palette: {
        primary: {
            main: "#b1a0f0",
        },
    },
});
