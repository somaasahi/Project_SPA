import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ImageList, TextField } from "@mui/material";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useStateIfMounted } from "use-state-if-mounted";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroller";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetail from "./PostDetail";

function Base(props) {
    const [animal, setAnimal] = useState("");
    const animalChange = (event) => {
        setAnimal(event.target.value);
    };

    const [kind, setKind] = useState("");
    const kindChange = (event) => {
        setKind(event.target.value);
    };

    const [order, setOrder] = useState("");
    const orderChange = (event) => {
        setOrder(event.target.value);
    };

    const [keyword, setKeyword] = useState("");
    const keywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const [posts, setPosts] = useStateIfMounted([]);

    const [hasMore, setHasMore] = useStateIfMounted(true);

    const getNextPosts = async () => {
        const response = await axios.get("api/homeIndex/", {
            params: {
                animal: animal,
                kind: kind,
                order: order,
                keyword: keyword,
                total: posts.length,
            },
        });
        const results = response.data;

        if (results.length < 1) {
            setHasMore(false);
        }
        if (posts.length > 80) {
            setHasMore(false);
            toast.error("これ以上表示できません(300件くらいで出す予定)", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setPosts([...posts, ...results]);
    };

    const loader = (
        <div className="loader" key={0}>
            Loading ...ロゴとかいい感じの待機画像出す予定
        </div>
    );

    const handleSearch = () => {
        setPosts([]);
        getNextPosts();
    };

    const [detailId, setDetailId] = useState("");
    const handleSetDetailId = (event) => {
        setDetailId(event);
    };

    let content;
    if (detailId == "") {
        content = (
            <div className="overflow-auto" style={{ height: "1000px" }}>
                <InfiniteScroll
                    loadMore={getNextPosts} //項目を読み込む際に処理するコールバック関数
                    hasMore={hasMore} //読み込みを行うかどうかの判定
                    loader={loader}
                    useWindow={false}
                >
                    <ImageList className="w-full h-full">
                        {posts.map((post) => (
                            <Post
                                key={post.id}
                                content={post}
                                handleClick={handleSetDetailId}
                            />
                        ))}
                    </ImageList>
                </InfiniteScroll>
            </div>
        );
    } else {
        content = (
            <PostDetail
                detailId={detailId}
                handleClick={handleSetDetailId}
                class="bg-orange-200"
                style={{ height: "1000px" }}
            />
        );
    }

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
                            <MenuItem value={null}>選択しない</MenuItem>
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
                            <MenuItem value={null}>選択しない</MenuItem>
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
                            <MenuItem value={null}>選択しない</MenuItem>
                            <MenuItem value={1}>
                                新しい順(今はid大きい順)
                            </MenuItem>
                            <MenuItem value={2}>人気順</MenuItem>
                            <MenuItem value={3}>
                                コメントが盛り上がってる順
                            </MenuItem>
                            <MenuItem value={4}>古い順</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="flex justify-end mb-4">
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
            <div id="content">{content}</div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Base;
