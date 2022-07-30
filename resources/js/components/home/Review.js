import React, { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NavigationIcon from '@mui/icons-material/Navigation';
import axios from "axios";

function Review(props) {
    const [reviews, setReview] = useState([]);
    useEffect(() => {
        axios
            .get("api/detail/review", {
                params: {
                    id: props.postId,
                },
            })
            .then((res) => {
                const results = res.data;
                setReview(results);
            })
            .catch((error) => {
                const { status, statusText } = error.response;
                alert(`Error! HTTP Status: ${status} ${statusText}`);
                // 存在しないidをパラメータにurl叩いたらlaravelから404ページ返す？
            });
    }, []);

    const [comment, setComment] = useState();
    const handleComment = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = () => {
        // バリデーションまだ
        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .post("api/detail/review", {
                        params: {
                            user_id: user.id,
                            post_id: props.postId,
                            comment: comment,
                        },
                    })
                    .then((res) => {
                        const results = res.data;
                        setReview(results);
                        setComment("");
                    })
                    .catch((error) => {
                        const { status, statusText } = error.response;
                        if (status === 400) {
                            toast.error("2~50文字で入力してください", {
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
            })
            .catch((error) => {
                const { status, statusText } = error.response;
                if (status == 401) {
                    toast.error("ログインが必要です。", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    alert(`Error! HTTP Status: ${status} ${statusText}`);
                }
            });
    };

    let noreview;
    if (reviews == "") {
        noreview = <p>コメントはありません</p>;
    } else {
        noreview = "";
    }

    // 通報関連処理
    const [open, setOpen] = React.useState(false);
    const [report, setReport] = useState('');
    const [review_id, setReviewId] = useState('');
    //レビューId取得
    const mouseEnterHandler = (event) => {
        setReviewId(event.target.id);
    }
    const handleClickOpen = (event) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReport = (event) => {
        setReport(event.target.value);
    }
    // コメント通報処理
    const postReport = async (event) => {
        await axios.get('api/user/')
            .then(async (res) => {
                const data = {
                    user_id: res.data.id,
                    post_id: props.postId,
                    about: report,
                    review_id: review_id,
                    type: 1,
                }
                await axios.post('api/detail/notification', data)
                    .then((res) => {
                        if (res.data.message === 'ok') {
                            setOpen(false);
                            toast.success("通報しました。", {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            toast.error(res.data.message, {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }

                    })

            }).catch((error) => {
                if (error.response.status == 401) {
                    toast.error("ログインが必要です。", {
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
    }


    return (
        <div className="w-full px-3">
            <div className="w-full p-4 border-2 border-slate-200 rounded-md mb-7">
                {noreview}
                {reviews.map((review) => (
                    <div key={review.id} className="flex p-2 mb-2">
                        <div>
                            <Avatar
                                src={review.img_url}
                                aria-label="recipe"
                                style={{ height: "70px", width: "70px" }}
                            >
                                noimg
                            </Avatar>
                        </div>
                        <div className="flex items-center ml-4 px-7 border-2 rounded-md w-full">
                            <div className="">
                                {review.deleted_at ? <p className="text-rose-600">このコメントは削除されました</p> : review.comment}
                            </div>
                        </div>
                        <div className="pt-3.5 pl-1">
                            {!review.deleted_at && <IconButton>
                                <NotificationImportantIcon fontSize="large" id={review.id} onMouseEnter={mouseEnterHandler} onClick={handleClickOpen} />
                            </IconButton>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full px-8">
                <div>
                    <TextField
                        label="投稿にコメントしよう！"
                        multiline
                        fullWidth
                        size="big"
                        maxRows={5}
                        onChange={handleComment}
                        value={comment}
                    />
                </div>
                <Box className="mt-7 grid justify-items-end">
                    <Button
                        style={{
                            height: "45px",
                            fontSize: "20px",
                        }}
                        className="w-1/4"
                        variant="outlined"
                        // endIcon={<SavedSearchIcon />}
                        onClick={handleSubmit}
                    >
                        送信
                    </Button>
                </Box>
            </div>
            <IconButton
                onClick={() => props.handleClick("")}
                style={{ height: "70px", width: "70px" }}
                aria-label="add to favorites"
            >
                <KeyboardReturnIcon style={{ height: "40px", width: "40px" }} />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>通報しますか？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="理由"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleReport}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>やめる</Button>
                    <Button onClick={postReport}>通報する</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
export default Review;
