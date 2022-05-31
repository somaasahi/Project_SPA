import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
    const authUser = props.user;
    const page = props.children;
    console.log(props);
    const authCheck = (authUser, page) => {
        if (!authUser) {
            return <Navigate to="/login" replace />;
        }

        return page;
    }

    return (
        <>
            {authCheck(authUser, page)}
        </>
    )
}

export default ProtectedRoute;
