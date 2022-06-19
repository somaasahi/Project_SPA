import React from "react";
import { Navigate } from "react-router-dom";
import Acount from "./Acount";
import UserConnection from "./UserConnection";

function Mypage() {
    return (
        <div className="md:flex">
            <div className="md:w-3/6 m-5">
                <Acount />
            </div>
            <div className="md:w-3/6 m-5">
                <UserConnection />
            </div>
        </div>
    );
}

export default Mypage;
