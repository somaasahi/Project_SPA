import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingChang from "./SettingChange";

function Profile() {

    const settingList = [
        "プロフィール編集",
        "個人情報編集",
        "パスワード変更",
        "ヘルプとサポート",
        "push通知設定"
    ]

    //設定タイプ
    const [setting, setSetting] = useState('');
    //表示切り替え用
    const [swich, setSwich] = useState(false);

    function handleClick(value) {
        setSetting(value);
    }

    useEffect(() => {
        if (setting) {
            setSwich(true);
        }
    }, [setting]);

    //通常表示
    const profile = () => {
        return (
            <Card className="w-4/5">
                <CardContent>
                    <Avatar
                        image="storage/post_images/noimg.png"
                        alt="profile"
                        sx={{ width: 80, height: 80 }}
                    />
                </CardContent>
                <CardContent>
                    <List>
                        <Divider />
                        {
                            settingList.map((listitem) => (
                                <ListItem disablePadding key={listitem} value={listitem}>
                                    <ListItemButton >
                                        <ListItemText primary={listitem} />
                                        <ListItemIcon >
                                            <ChevronRightIcon onClick={() => handleClick(listitem)} />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
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

    //表示
    const showProfile = () => {
        if (swich) {
            return (
                <SettingChang
                    setSwich={setSwich}
                    setSetting={setSetting}
                    setting={setting}
                />
            );
        } else {
            return profile();
        }
    }

    return (
        <>
            {showProfile()}
        </>
    );
}

export default Profile;
