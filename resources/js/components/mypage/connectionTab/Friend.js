import { Avatar, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";


function Friend() {

    //friend情報
    const [user, setUser] = useState('');

    useEffect(async () => {
        const { data } = await axios.get("/api/FriendRelation");
        setUser(data);
    }, []);
    if (!user) return 'load...';
    console.log(user);
    const index = (
        <ListItem>
            {
                user.map((user, key) => {
                    <ListItemText key={key} primary={user.id} />
                })
            }
        </ListItem>
    );

    return (
        < List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {
                user.map((user) => (

                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            {/* 写真 */}
                            <Avatar alt="" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="ユーザー名"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {user.id}
                                </React.Fragment>
                            }
                        />
                        <ListItemButton>
                            <InfoIcon />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List >

    );
}

export default Friend;
