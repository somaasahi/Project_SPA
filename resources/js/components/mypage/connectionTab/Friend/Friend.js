import { Avatar, Box, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { ShowChart } from "@mui/icons-material";
import Test from "../Test";
import FriendList from "./FriendList";
import FriendDetail from "./FriendDetail";


function Friend() {

    //friend情報
    const [user, setUser] = useState('');

    const [value, setValue] = useState('true');
    //user.id
    const [id, setId] = useState('');

    const handleClick = (event, newValue) => {
        setUser('true');

    };

    useEffect(async () => {
        const { data } = await axios.get("/api/FriendRelation");
        setUser(data);
    }, []);

    useEffect(() => {
        if (id) {
            setValue('');
        }
    }, [id]);

    if (!user) return 'load...';

    const show = () => {
        if (value == 'true') {
            return user.map((user) => (
                <FriendList
                    key={user.id}
                    user={user}
                    setValue={setId}
                />
            ))
        } else {
            return <FriendDetail
                id={id}
            />
        }

    }

    return (
        <Box>
            < List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
                {show()}
            </List >
        </Box>
    );
}

export default Friend;
