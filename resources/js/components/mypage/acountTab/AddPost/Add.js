import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Add() {
    const [animal, setAnimal] = useState("");
    const animalChange = (event) => {
        setAnimal(event.target.value);
    };

    const [kind, setKind] = useState("");
    const kindChange = (event) => {
        setKind(event.target.value);
    };

    const [content, setContent] = useState("");
    const contentChange = (event) => {
        setContent(event.target.value);
    };

    const fileInput = React.createRef();
    const fileInput2 = React.createRef();
    const fileInput3 = React.createRef();

    const submitPost = () => {
        const file = new FormData();
        file.append("animal_kind", animal);
        file.append("post_kind", kind);
        file.append("image", fileInput.current.files[0]);
        file.append("image2", fileInput2.current.files[0]);
        file.append("image3", fileInput3.current.files[0]);
        file.append("content", content);

        axios
            .post("api/mypage/post/store", file, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    toast.success(
                        "投稿に成功しました。自分の投稿一覧から確認してみましょう。",
                        {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );

                    setAnimal("");
                    setKind("");
                    setContent("");
                    // fileInput.current.value = "";
                    // fileInput2.current.value = "";
                    // fileInput3.current.value = "";
                    setOpen(false);
                }
            })
            .catch((error) => {
                const { status, statusText } = error.response;
                if (status === 400) {
                    toast.error("投稿ルールに従って下さい。", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("システムエラー", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className="w-full">
            <CardContent>
                <p className="text-red-600">サブ画像を除いて必須項目です。</p>
                <p className="text-red-600">投稿文は400文字以内です。</p>
            </CardContent>
            <CardContent>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">動物</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="animal"
                        value={animal}
                        onChange={animalChange}
                    >
                        <MenuItem value={1}>いぬ</MenuItem>
                        <MenuItem value={2}>ねこ</MenuItem>
                        <MenuItem value={3}>鳥</MenuItem>
                        <MenuItem value={4}>爬虫類</MenuItem>
                        <MenuItem value={5}>昆虫</MenuItem>
                        <MenuItem value={6}>その他</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
            <CardContent>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        投稿の種類
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="animal"
                        value={kind}
                        onChange={kindChange}
                    >
                        <MenuItem value={1}>役立つ</MenuItem>
                        <MenuItem value={2}>面白い</MenuItem>
                        <MenuItem value={3}>助けてほしい！</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
            <CardContent>
                <Button variant="contained" component="label">
                    メイン画像を選択
                    <input
                        hidden
                        type="file"
                        name="image"
                        ref={fileInput}
                        accept="image/*"
                    />
                </Button>
            </CardContent>
            <CardContent>
                <Button variant="contained" component="label">
                    サブ画像１を選択
                    <input
                        hidden
                        type="file"
                        name="image2"
                        ref={fileInput2}
                        accept="image/*"
                    />
                </Button>
            </CardContent>
            <CardContent>
                <Button variant="contained" component="label">
                    サブ画像２を選択
                    <input
                        hidden
                        type="file"
                        name="image3"
                        ref={fileInput3}
                        accept="image/*"
                    />
                </Button>
            </CardContent>
            <CardContent>
                <FormControl className="w-full" variant="standard">
                    <label>投稿文</label>
                    <TextField
                        className="w-full p-1"
                        id="outlined-multiline-static"
                        multiline
                        rows={15}
                        onChange={contentChange}
                        value={content}
                        inputProps={{ style: { fontSize: 19, padding: 2 } }}
                    />
                </FormControl>
            </CardContent>
            <CardActions className="flex justify-end">
                <button
                    onClick={handleClickOpen}
                    className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    投稿
                </button>
            </CardActions>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"この内容で投稿しますか？"}</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose}>いいえ</Button>
                    <Button onClick={submitPost}>はい</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default Add;
