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
import { useInView } from "react-intersection-observer";

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

    const [total, setTotal] = useState(0);

    const [posts, setPosts] = useStateIfMounted([]);
    const ref = useRef(null);
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
    };
    const call = () => {
        console.log("call");
    };

    const getPosts = useCallback(async () => {
        const response = await axios.get("api/homeIndex/", {
            params: {
                animal: animal,
                kind: kind,
                order: order,
                keyword: keyword,
            },
        });
        const results = await response.data;
        setPosts(results);
    }, []);

    useEffect(() => {
        // 第二引数が実行された時のみ第一引数が走る
        getPosts();
    }, [getPosts]);

    const getNextPosts = () => {
        console.log(total);
        // const response = await axios.get("api/homeIndex/", {
        //     params: {
        //         animal: animal,
        //         kind: kind,
        //         order: order,
        //         keyword: keyword,
        //         total: posts.length,
        //     },
        // });
        // const results = response.data;
        // console.log(results);
        // if (results.length === 0) {
        //     console.log("end");
        // }
        // setPosts([...posts, ...results]);
        console.log("okok");
    };
    const observer = new IntersectionObserver(getNextPosts, options);

    useEffect(() => {
        observer.observe(ref.current);
    }, [getPosts]);

    useEffect(() => {
        setTotal(posts.length);
        console.log(total);
        console.log("ok");
    }, [posts]);

    useEffect(() => {
        console.log("ll");
    }, [getNextPosts]);

    // useEffect(async () => {
    //     console.log("ok");
    //     let num = posts.length;
    //     setTotal(num);
    //     console.log(total);
    //     const response = await axios.get("api/homeIndex/", {
    //         params: {
    //             animal: animal,
    //             kind: kind,
    //             order: order,
    //             keyword: keyword,
    //             total: total,
    //         },
    //     });
    //     const results = response.data;
    //     // console.log(results);
    //     if (results.length === 0) {
    //         console.log("end");
    //     }
    //     setPosts([...posts, ...results]);
    // }, [getNextPosts]);

    const handleSearch = () => {
        console.log("d");
    };

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
                <ImageList className="w-full h-full">
                    {posts.map((post) => (
                        <Post key={post.id} content={post} />
                    ))}
                </ImageList>
                <div id="ref" ref={ref} style={{ height: "300px" }} />
            </div>
        </div>
    );
}

export default Base;
