import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {

    const isAuth = props.authUser;
    const page = props.children;

    const authCheck = () => {

        if (!isAuth) {
            return <Navigate to="/login" replace />;
        }

        return page;
    }

    return (
        <>
            {authCheck(isAuth, page)}
        </>
    )
}

export default ProtectedRoute;
