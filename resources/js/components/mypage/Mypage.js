import { Grid, Paper, styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import Acount from "./Acount";
import UserConnection from "./UserConnection";

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


