import {
    Avatar,
    Button,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function FriendList(props) {
    const [status, setStatus] = useState(null);
    useEffect(() => {
        setStatus(props.user.status);
    }, []);
    const show = (event, id) => {
        props.setValue(id);
    };
    const postFriend = (e) => {
        axios
            .post("api/mypage/update", {
                params: {
                    from_user_id: props.user.from_user_id,
                    to_user_id: props.user.to_user_id,
                    status: e,
                },
            })
            .then((res) => {
                console.log(res.data);

                setStatus(res.data);
            })
            .catch((error) => {
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
    let action;
    if (status == 1) {
        action = (
            <div>
                <ForumIcon
                    color="primary"
                    sx={{ mr: 7 }}
                    onClick={(event) => {
                        show(event, props.user.user.id);
                    }}
                />
                <InfoIcon
                    onClick={(event) => {
                        show(event, props.user.user.id);
                    }}
                />
            </div>
        );
    } else if (status == 0) {
        action = (
            <div>
                <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={(event) => {
                        postFriend(1);
                    }}
                >
                    フレンドになる
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(event) => {
                        postFriend(2);
                    }}
                >
                    申請を断る
                </Button>
                <InfoIcon
                    sx={{ ml: 2 }}
                    onClick={(event) => {
                        show(event, props.user.user.id);
                    }}
                />
            </div>
        );
    } else {
        action = <Button color="secondary">フレンドにはなれません</Button>;
    }
    return (
        <ListItem alignItems="flex-start">
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar alt="" src={props.user.user.profile.img_url} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.user.user.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            ></Typography>
                        </React.Fragment>
                    }
                />
                {action}
            </ListItemButton>
        </ListItem>
    );
}

export default FriendList;
