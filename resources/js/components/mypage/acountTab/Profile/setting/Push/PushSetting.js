import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios";
import { toast } from "react-toastify";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import DraftsIcon from '@mui/icons-material/Drafts';
import { ExpandMore, Streetview } from "@mui/icons-material";
import AdminContent from "./AdminContent";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostDetail from "../../../PostDetail";

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
    const readMessage = async (value) => {
        setRead(true);
        const adminId = { id: value.adminId }
        await axios.post("api/readAdminMessage", adminId)
            .then((res) => {
                true
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

    const openPostDetail = (toAdminMessage) => {
        setView(true);
    }
    const closePostDetail = () => {
        setView(false);
    }



    if (!adminMessage) return 'ロード中・・・';
    console.log(adminMessage);
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {adminMessage.map((value) => {
                return (
                    <div key={value.adminId}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                onClick={() => readMessage(value)}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    <ListItemIcon>
                                        {checkMail(value.check_flg)}
                                    </ListItemIcon>
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{value.check_flg ? '開封済み' : '新着メッセージがあります。'}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    下記の{value.about}
                                </Typography>
                                <Typography>
                                    {view ? <Button size="large" onClick={closePostDetail}>戻る</Button>
                                        : <Button size="large" onClick={openPostDetail}>投稿詳細</Button>}
                                    {view && <PostDetail
                                        detailId={value.post_id}
                                        pushCheck={true}
                                        class="bg-orange-200"
                                        style={{ height: "1000px" }}
                                    />}
                                </Typography>
                                <Typography>
                                    <IconButton>
                                        <KeyboardReturnIcon />
                                    </IconButton>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })
            }
        </List >
    )
}

export default PushSetting;
