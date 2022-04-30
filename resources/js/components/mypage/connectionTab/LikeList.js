import { Avatar, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';

function LikeList() {
    return (
        // propsで回す
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    {/* 写真 */}
                    <Avatar alt="" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="記事名"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            {"情報"}
                        </React.Fragment>
                    }
                />
                <ListItemButton>
                    <InfoIcon />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

export default LikeList;
