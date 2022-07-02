import { Badge, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Friend from "./connectionTab/Friend/Friend";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeList from "./connectionTab/LikeList";
import Add from "./acountTab/AddPost/Add";
import AddCardIcon from "@mui/icons-material/AddCard";

function UserConections() {
    //画面切り替え
    const [value, setValue] = useState("friend");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //表示component
    function TabChange(value, user) {
        if (value == "add") {
            return <Add />;
        } else if (value == "friend") {
            return <Friend />;
        } else {
            return <LikeList />;
        }
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                value={value}
                onChange={(event, value) => {
                    // friendUser(event);
                    handleChange(event, value);
                }}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="friend" label="フレンド" icon={<GroupIcon />} />
                <Tab value="add" label="投稿する" icon={<AddCardIcon />} />

                <Tab value="like" label="いいね一覧" icon={<FavoriteIcon />} />
            </Tabs>
            {TabChange(value)}
        </Box>
    );
}

export default UserConections;
