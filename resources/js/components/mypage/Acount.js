import { Badge, Box, IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Profile from "./acountTab/Profile/Profile";
import PostList from "./acountTab/PostList";
import EditList from "./acountTab/EditList";

function Acount() {
    const [value, setValue] = useState("profile");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //表示component
    function TabChange(tab) {
        if (tab == "profile") {
            return <Profile />;
        } else if (tab == "post") {
            return <PostList />;
        } else if (tab == "edit") {
            return <EditList />;
        } else {
            return <Profile />;
        }
    }

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
                <Tab value="edit" label="編集・削除" icon={<PostAddIcon />} />
            </Tabs>
            {TabChange(value)}
        </Box>
    );
}

export default Acount;
