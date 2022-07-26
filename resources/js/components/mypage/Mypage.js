import React from "react";
import { Navigate } from "react-router-dom";
import Acount from "./Acount";
import UserConnection from "./UserConnection";
import { ToastContainer, toast } from "react-toastify";

function Mypage() {
    return (
        <div className="md:flex mt-20 min-h-screen">
            <div className="md:w-3/6 m-5">
                <Acount />
            </div>
            <div className="md:w-3/6 m-5">
                <UserConnection />
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Mypage;
