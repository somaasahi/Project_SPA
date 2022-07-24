import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";

function Navigation(props) {
    const isAuth = props.authUser;

    const logout = async () => {
        await axios.get("api/logout").then((respons) => {
            props.setAuthUser(respons.data);
        });
    };

    const authChangeLogin = () => {
        if (isAuth) {
            return (
                <Link to="/login" onClick={logout}>
                    logout
                </Link>
            );
        }
        return <Link to="/login">login</Link>;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ background: "#3CB371" }}>
                <Toolbar>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar src="storage/post_images/header2.jpg" />
                    </IconButton>
                    <Typography
                        fontStyle="oblique"
                        letterSpacing={6}
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1, ml: 1 }}
                    >
                        ANIMAL_RESCUE
                        <IconButton sx={{ ml: 1, p: 0 }}>
                            <Avatar src="storage/post_images/header2.jpg" />
                        </IconButton>
                    </Typography>

                    <span className="mr-4">
                        <Link to="/">home</Link>
                    </span>
                    <span className="mr-4">{authChangeLogin()}</span>
                    <span className="mr-4">
                        {isAuth && <Link to="/mypage">mypage</Link>}
                    </span>
                    <span className="mr-4">
                        <Link to="/about">about</Link>
                    </span>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navigation;
