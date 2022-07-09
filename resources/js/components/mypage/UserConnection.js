import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Friend from "./connectionTab/Friend/Friend";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeList from "./connectionTab/LikeList";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditList from "./acountTab/EditList";

function UserConections() {
    //画面切り替え
    const [value, setValue] = useState("friend");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //表示component
    function TabChange(value, user) {
        if (value == "edit") {
            return <EditList />;
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
                <Tab value="edit" label="編集・削除" icon={<PostAddIcon />} />

                <Tab value="like" label="いいね一覧" icon={<FavoriteIcon />} />
            </Tabs>
            {TabChange(value)}
        </Box>
    );
}

export default UserConections;
