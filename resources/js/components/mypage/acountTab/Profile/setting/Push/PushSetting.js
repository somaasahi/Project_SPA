import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { toast } from "react-toastify";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import DraftsIcon from "@mui/icons-material/Drafts";
import { DriveEtaTwoTone, ExpandMore, Streetview } from "@mui/icons-material";
import AdminContent from "./AdminContent";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostDetail from "../../../../../home/PostDetail";
import PushPostDetail from "./PushPostDtail";

function PushSetting(props) {
    const [checked, setChecked] = React.useState([0]);
    const [adminMessage, setAdminMessage] = useState("");
    const [read, setRead] = useState(false);
    const [view, setView] = useState(false);
    const [data1, setData] = useState();
    const [detailId, setDetailId] = useState("");
    const backPage = () => {
        props.setSwich(true);
    };

    useEffect(() => {}, [data1]);
    // メッセージ受けとり
    useEffect(async () => {
        await axios.get("api/user/").then(async (res) => {
            await axios
                .get("api/getAdminMessage/", {
                    params: {
                        id: res.data.id,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setAdminMessage(res.data);
                })
                .catch((e) => {
                    toast.error("システムエラー", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        });
    }, []);

    // 既読挙動
    const checkMail = (check_flg) => {
        if (read) {
            return <DraftsIcon />;
        }

        if (check_flg) {
            return <DraftsIcon />;
        }
        return <LocalPostOfficeIcon />;
    };

    // 既読時にチェックを入れる
    const readMessage = async (value) => {
        setData(value);
        setRead(true);
        const adminId = { id: value.adminId };
        await axios
            .post("api/readAdminMessage", adminId)
            .then((res) => {
                true;
            })
            .catch((e) => {
                toast.error("システムエラー", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const openPostDetail = (e) => {
        console.log(e);
    };

    if (!adminMessage) return "ロード中・・・";

    return (
        <div>
            <div className="overflow-auto">
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        maxHeight: 500,
                        bgcolor: "background.paper",
                    }}
                >
                    {!view ? (
                        adminMessage.map((value) => {
                            return (
                                <div key={value.adminId}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id={value}
                                            onClick={() => readMessage(value)}
                                        >
                                            <Typography
                                                sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <ListItemIcon>
                                                    {checkMail(value.check_flg)}
                                                </ListItemIcon>
                                            </Typography>
                                            <Typography
                                                sx={{ color: "text.secondary" }}
                                            >
                                                {value.check_flg
                                                    ? "開封済み"
                                                    : "新着メッセージがあります。"}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {value.about}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            );
                        })
                    ) : (
                        <PostDetail detailId={detailId} />
                    )}
                </List>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={backPage}
                    className="text-lg bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    戻る
                </button>
            </div>
        </div>
    );
}

export default PushSetting;
