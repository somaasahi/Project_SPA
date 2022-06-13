import axios from "axios";

export const authId = async () => {
    try {
        await axios.get("api/user").then((response) => {
            const data = response.data;
            return data;
        });
    } catch (e) {
        if (e.response && e.response.status === 401) {
            return false;
        }
    }
};
