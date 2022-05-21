import { Avatar, Box, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";


import axios from "axios";
import FriendList from "./FriendList";
import FriendDetail from "./FriendDetail";




function Friend() {

    //friend情報
    const [user, setUser] = useState('');
    //freand切り替え用
    const [swich, setSwich] = useState(true);
    //user.id
    const [id, setId] = useState('');


    useEffect(async () => {
        const { data } = await axios.get("/api/FriendRelation");
        setUser(data);
    }, []);

    useEffect(() => {
        if (id) {
            setSwich(false);
        }
    }, [id]);

    /**ページ関連 */

    // 何番目のアイテムから表示するか
    const [offset, setOffset] = useState(0);
    // 1ページあたりに表示したいアイテムの数
    const perPage = 5;
    // ページ切り替え
    const handleChange = (event, value) => {
        setOffset(value);
    };

    //非同期処理待ち
    if (!user) return 'load...';

    const show = () => {
        if (swich) {
            return user.slice(offset, offset + perPage).map((user) => (
                <FriendList
                    key={user.id}
                    user={user}
                    setValue={setId}
                />
            ))
        } else {
            return <FriendDetail
                id={id}
            />
        }
    }


    return (
        <Box>
            <Stack spacing={2}>
                < List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {show()}
                </List >
                {/* ユーザー詳細画面移行時に非表示処理 */}
                {swich && <Pagination count={Math.ceil(user.length / perPage)} onChange={handleChange} color="primary" />}
            </Stack>
        </Box>
    );
}

export default Friend;
