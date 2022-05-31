import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";

function Navigation(props) {
    const isAuth = props.authUser;

    const logout = async () => {
        await axios.get('api/logout').then((respons) => {
            console.log(respons.data)
            props.setAuthUser(respons.data);
        })
    }

    const authChangeLogin = () => {
        if (isAuth) {
            return (
                <Link
                    to="/login"
                    onClick={logout}
                >logout</Link>
            )
        }
        return <Link to="/login">login</Link>
    }

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
                    <span className="mr-4">
                        <Link to="/">home</Link>
                    </span>
                    <span className="mr-4">
                        {authChangeLogin()}
                    </span>
                    <span className="mr-4">
                        {isAuth && <Link to="/mypage">mypage</Link>}
                    </span>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navigation;
