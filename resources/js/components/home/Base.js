import React, { useCallback, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ImageList, TextField } from "@mui/material";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useStateIfMounted } from "use-state-if-mounted";
import Post from "./Post";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";

function Base(props) {
    // const [animal, setAnimal] = useState("");
    // const animalChange = (event) => {
    //     setAnimal(event.target.value);
    // };

    // const [kind, setKind] = useState("");
    // const kindChange = (event) => {
    //     setKind(event.target.value);
    // };

    // const [order, setOrder] = useState("");
    // const orderChange = (event) => {
    //     setOrder(event.target.value);
    // };

    // const [keyword, setKeyword] = useState("");
    // const keywordChange = (event) => {
    //     setKeyword(event.target.value);
    // };

    const [hasMore, setHasMore] = useStateIfMounted(true);

    // const response = await axios.get("api/homeIndex/", {
    //     params: {
    //         animal: animal,
    //         kind: kind,
    //         order: order,
    //         keyword: keyword,
    //         page: page,
    //     },
    // });
    // const result = response.data;
    // if (result.length < 1) {
    //     setHasMore(false);
    //     console.log("dead");
    //     return;
    // }
    // setPosts([...posts, ...result]);

    const handleSearch = () => {
        console.log("d");
    };

    const fetchPosts = async ({ pageParam = 1 }) => {
        const { data } = await axios.get("api/homeIndex/", {
            params: {
                // animal: animal,
                // kind: kind,
                // order: order,
                // keyword: keyword,
                page: page,
            },
        });
        if (data.length < 1) {
            setHasMore(false);
            console.log("dead");
            return;
        }

        return { data, nextPage: pageParam + 1, totalPages: 30 };
    };

    const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery(
        "posts",
        fetchPosts,
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.nextPage < lastPage.totalPages)
                    return lastPage.nextPage;
                return undefined;
            },
        }
    );

    return (
        <div>
            <div className="flex content-between">
                <Box className="flex-1 m-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            動物
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={animal}
                            label="animal"
                            onChange={animalChange}
                        >
                            <MenuItem value={1}>いぬ</MenuItem>
                            <MenuItem value={2}>ねこ</MenuItem>
                            <MenuItem value={3}>さる</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="flex-1 m-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            投稿の種類
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kind}
                            label="kind"
                            onChange={kindChange}
                        >
                            <MenuItem value={1}>役立つ</MenuItem>
                            <MenuItem value={2}>面白い</MenuItem>
                            <MenuItem value={3}>助けてほしい！</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="flex-1 m-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            並び順
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            label="order"
                            onChange={orderChange}
                        >
                            <MenuItem value={1}>新しい順</MenuItem>
                            <MenuItem value={2}>人気順</MenuItem>
                            <MenuItem value={3}>
                                コメントが盛り上がってる順
                            </MenuItem>
                            <MenuItem value={4}>古い順</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="flex justify-end">
                <div className="w-1/4 m-5">
                    <div className="m-auto w-full">
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="気になるワード"
                            variant="outlined"
                            onChange={keywordChange}
                        />
                    </div>
                </div>
                <div className="w-1/4 m-5">
                    <div
                        className="text-center m-auto py-3 px-6 text-xl rounded-md
                    text-blue-300 bg-transparent border border-blue-300 hover:text-white hover:bg-blue-300"
                        onClick={handleSearch}
                    >
                        検索
                        <SavedSearchIcon />
                    </div>
                </div>
            </div>
            <div className="overflow-auto" style={{ height: "1000px" }}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>There was an error</p>
                ) : (
                    <InfiniteScroll
                        hasMore={hasMore}
                        loadMore={fetchNextPage}
                        useWindow={false}
                    >
                        <ImageList className="w-full h-full">
                            {data.pages.map((page) =>
                                page.map((post) => (
                                    <Post key={post.id} content={post} />
                                ))
                            )}
                        </ImageList>
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
}

export default Base;
