import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios";
import { toast } from "react-toastify";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Streetview } from "@mui/icons-material";
import AdminContent from "./AdminContent";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

function PushSetting(props) {
    const [checked, setChecked] = React.useState([0]);
    const [adminMessage, setAdminMessage] = useState('');
    const [read, setRead] = useState(false);
    const [view, setView] = useState(false);
    // メッセージ受けとり
    useEffect(async () => {
        await axios.get("api/getAdminMessage")
            .then((res) => {
                setAdminMessage(res.data);
            }).catch((e) => {
                toast.error("システムエラー", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            });
    }, []);

    // 既読挙動
    const checkMail = (check_flg) => {
        if (read) {
            return <DraftsIcon />
        }

        if (check_flg) {
            return <DraftsIcon />
        }
        return <LocalPostOfficeIcon />
    }
    // 既読時にチェックを入れる
    const readMessage = async (id) => {
        setRead(true);
        const adminId = { id: id }
        await axios.post("api/readAdminMessage", adminId)
            .then((res) => {
                return true;
            }).catch((e) => {
                toast.error("システムエラー", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    };

    const showInfo = (toAdminMessage) => {
        setView(true);
    }
    const closeInfo = () => {
        setView(false);
    }
    const adminContent = (value) => {
        if (view) {
            return (
                <>
                    <div>
                        {value.about}
                    </div>
                    <div>
                        <IconButton>
                            <KeyboardReturnIcon onClick={closeInfo} />
                        </IconButton>
                    </div>
                </>
            );
        } else {
            return '';
        }
    };
    console.log(adminMessage);
    if (!adminMessage) return 'ロード中・・・';
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {adminMessage.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <>
                        <ListItem
                            key={value}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon onClick={() => showInfo(value)} />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => readMessage(value.id)}>
                                <ListItemIcon>
                                    {checkMail(value.check_flg)}
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.check_flg ? '開封済み' : '新着メッセージがあります。'} />
                            </ListItemButton>
                        </ListItem>
                        {adminContent(value)}
                    </>
                );
            })
            }
        </List >
    )
}

export default PushSetting;
