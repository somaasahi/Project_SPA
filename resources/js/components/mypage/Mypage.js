import { Grid, Paper, styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import Acount from "./Acount";
import UserConnection from "./UserConnection";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Mypage() {

    return (
        <div className="md:flex">
            <div className="md:w-3/6">
                <Acount />
            </div>
            <div className="md:w-3/6">
                <UserConnection />
            </div>
        </div>
    );
}

export default Mypage;

if (document.getElementById("app")) {
    ReactDOM.render(<Mypage />, document.getElementById("app"));
}
