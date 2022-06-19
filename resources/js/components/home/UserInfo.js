import React, { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";

function UserInfo(props) {
    return (
        <div>
            <div className="w-full md:flex m-3">
                <div className="md:w-1/2">
                    <img src={props.icon} />
                </div>
                <div className="p-3 md:w-1/2">
                    <p className="break-words">{props.description}</p>
                </div>
            </div>
            <IconButton
                onClick={() => props.handleClick(null)}
                style={{ height: "70px", width: "70px" }}
                aria-label="add to favorites"
            >
                <KeyboardReturnIcon style={{ height: "40px", width: "40px" }} />
            </IconButton>
        </div>
    );
}

export default UserInfo;
