import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Profile() {

    const settingList = [
        "プロフィール編集",
        "パスワード変更",
        "ヘルプとサポート",
        "push通知設定"
    ]

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        image="storage/post_images/noimg.png"
                        alt="profile"
                        sx={{ width: 56, height: 56 }}
                    />
                }
            />
            <CardContent>
                <List>
                    <Divider />
                    {
                        settingList.map((listitem) => (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={listitem} />
                                        <ListItemIcon>
                                            <ChevronRightIcon />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </>
                        ))
                    }

                </List>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Profile;
