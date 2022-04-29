import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        test_navigation
                    </Typography>
                    <span>
                        <Link to="/">home</Link>
                    </span>
                    <span>
                        <Link to="/login">login</Link>
                    </span>
                    <span>
                        <Link to="/mypage">mypage</Link>
                    </span>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navigation;
