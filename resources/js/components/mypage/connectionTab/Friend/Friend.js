import {
    Avatar,
    Box,
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Pagination,
    PaginationItem,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import FriendList from "./FriendList";
import FriendDetail from "./FriendDetail";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateIfMounted } from "use-state-if-mounted";

function Friend(props) {
    //friend情報
    const [user, setUser] = useStateIfMounted("");
    //freand切り替え用
    const [swich, setSwich] = useState(true);
    //user.id
    const [id, setId] = useState("");

    const [authState, setAuthState] = useState(false);

    useEffect(() => {
        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .get("/api/FriendRelation", {
                        params: {
                            user_id: user.id,
                        },
                    })
                    .then((res) => {
                        const results = res.data;

                        setUser(results);
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
                if (error.response.status === 401) {
                    setAuthState(true);
                }
            });
    }, []);

    /**ページ関連 */

    // 何番目のアイテムから表示するか
    const [offset, setOffset] = useState(0);
    // 1ページあたりに表示したいアイテムの数
    const perPage = 5;
    // ページ切り替え
    const handleChange = (event, value) => {
        setOffset(value);
    };

    //認証が切れたときの処理
    if (authState) {
        return <Navigate to="/login" />;
    }

    //非同期処理待ち
    if (!user) return "load...";

    let base;
    if (id == "") {
        base = (
            <div>
                <Stack spacing={2}>
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {user.slice(offset, offset + perPage).map((user) => (
                            <FriendList
                                key={user.id}
                                user={user}
                                setId={setId}
                            />
                        ))}
                    </List>
                    <Pagination
                        count={Math.ceil(user.length / perPage)}
                        onChange={handleChange}
                        color="primary"
                    />
                </Stack>
            </div>
        );
    } else {
        base = <FriendDetail id={id} setId={setId} />;
    }

    return <Box>{base}</Box>;
}

export default Friend;
