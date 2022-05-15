import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';

function FriendList(props) {

    const show = (event, id) => {
        props.setValue(id);
    }
    return (
        <ListItem alignItems="flex-start">
            <ListItemButton>
                <ListItemAvatar>
                    {/* 写真 */}
                    <Avatar alt="" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={props.user.user.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            {/* {user.id} */}
                        </React.Fragment>
                    }
                />

                <InfoIcon
                    onClick={(event) => {
                        show(event, props.user.user.id);
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default FriendList;
