import { Badge, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Friend from "./connectionTab/Friend/Friend";
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Notification from "./connectionTab/Notification";
import LikeList from "./connectionTab/LikeList";


function UserConections() {

    //画面切り替え
    const [value, setValue] = useState('notification');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //表示component
    function TabChange(value, user) {

        if (value == 'notification') {
            return <Notification />
        }
        else if (value == 'friend') {
            return <Friend />
        }
        else if (value == 'like') {
            return <LikeList />
        }
        else {
            return <Notification />
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
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
                <Tab
                    value="notification"
                    label="通知"
                    icon={
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>}
                />
                <Tab
                    value="friend"
                    label="フレンド"
                    icon={<GroupIcon />}
                />
                <Tab
                    value="like"
                    label="いいね一覧"
                    icon={<FavoriteIcon />}
                />
            </Tabs>
            {TabChange(value)}
        </Box>
    );
}

export default UserConections;


