import { Badge, Box, IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Friend from "./connectionTab/Friend/Friend";
import Notification from "./connectionTab/Notification";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Profile from "./acountTab/Profile/Profile";
import Post from "./acountTab/Post";
import Edit from "./acountTab/Edit";


function Acount() {
    const [value, setValue] = useState('profile');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //表示component
    function TabChange(tab) {

        if (tab == 'profile') {
            return <Profile />
        }
        else if (tab == 'post') {
            return <Post />
        }
        else if (tab == 'edit') {
            return <Edit />
        }
        else {
            return <Profile />
        }
    }

    //通知


    return (
        <Box sx={{ width: '100%' }}>
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
                <Tab
                    value="post"
                    label="投稿一覧"
                    icon={<EditIcon />}
                />
                <Tab
                    value="edit"
                    label="編集一覧"
                    icon={<PostAddIcon />} />
            </Tabs>
            {TabChange(value)}
        </Box>
    );
}

export default Acount;


