import { Avatar, Box, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { ShowChart } from "@mui/icons-material";
import Test from "../Test";
import FriendList from "./FriendList";
import FriendDetail from "./FriendDetail";
import ReactPaginate from "react-paginate";


function Friend() {

    //friend情報
    const [user, setUser] = useState('');

    const [value, setValue] = useState('true');
    //user.id
    const [id, setId] = useState('');

    const handleClick = (event, newValue) => {
        setUser('true');

    };

    const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
    const perPage = 5;// 1ページあたりに表示したいアイテムの数

    // クリック時のfunction
    const handlePageChange = (data) => {
        let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
        setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
    }

    useEffect(async () => {
        const { data } = await axios.get("/api/FriendRelation");
        setUser(data);
    }, []);

    useEffect(() => {
        if (id) {
            setValue('');
        }
    }, [id]);

    if (!user) return 'load...';
    console.log(perPage);
    const show = () => {
        if (value == 'true') {
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
            < List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
                {show()}
            </List >

            <Stack spacing={2}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(user.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
                    marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
                    pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
                    onPageChange={handlePageChange} // クリック時のfunction
                    containerClassName={'pagination'} // ページネーションであるulに着くクラス名
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'} // アクティブなページのliに着くクラス名
                    // previousClassName={'pagination__previous'} // 「<」のliに着けるクラス名
                    // nextClassName={'pagination__next'} // 「>」のliに着けるクラス名
                    disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
                />
                {/* <Pagination
                    count={9}
                    user={(item) => (
                        <PaginationItem
                            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                /> */}
            </Stack>

        </Box>
    );
}

export default Friend;
