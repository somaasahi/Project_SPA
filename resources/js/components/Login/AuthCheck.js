import axios from "axios";
import React from "react";

export const authCheck = async () => {
    try {
        await axios.get("api/user").then((response) => {
            const data = response.data;
        });
        return true;
    } catch (e) {
        if (e.response && e.response.status === 401) {
            return false;
        }
    }
}

