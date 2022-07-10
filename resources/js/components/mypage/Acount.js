import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import Profile from "./acountTab/Profile/Profile";
import PostList from "./acountTab/PostList";
import Add from "./acountTab/AddPost/Add";
import AddCardIcon from "@mui/icons-material/AddCard";

function Acount() {
    const [value, setValue] = useState("profile");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //表示component
    const TabChange = (tab) => {
        if (tab == "profile") {
            return <Profile />;
        } else if (tab == "post") {
            return <PostList />;
        } else if (tab == "add") {
            return <Add tabchange={TabChange} />;
        } else {
            return <Profile />;
        }
    };

    //通知

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab
                    value="profile"
                    label="プロフィール"
                    icon={<AccountCircleIcon />}
                />

                <Tab value="post" label="自分の投稿" icon={<EditIcon />} />
                <Tab value="add" label="投稿する" icon={<AddCardIcon />} />
            </Tabs>
            {TabChange(value)}
        </Box>
    );
}

export default Acount;
