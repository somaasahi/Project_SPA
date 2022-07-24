import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import UserInfo from "./UserInfo";
import Review from "./Review";
import { ToastContainer, toast } from "react-toastify";
import { authCheck } from "../Login/AuthCheck";
import { authId } from "../Login/AuthId";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

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

function PostDetail(props) {
    const [item, setItem] = useState([]);
    const [user2, setUser2] = useState([]);
    const [profile, setProfile] = useState([]);
    const [likes, setLikes] = useState();
    const [userLike, setUserLike] = useState(false);

    useEffect(() => {
        axios
            .get("api/detail/", {
                params: {
                    id: props.detailId,
                },
            })
            .then((res) => {
                const item = res.data;
                setItem(item[0]);
                setUser2(item[1]);
                setProfile(item[2]);
                setLikes(item[0].likes_count);
            })
            .catch((error) => {
                const { status, statusText } = error.response;
                alert(`Error! HTTP Status: ${status} ${statusText}`);
                // 存在しないidをパラメータにurl叩いたらlaravelから404ページ返す？
            });

        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .get("api/detail/checkLike", {
                        params: {
                            user_id: user.id,
                            post_id: props.detailId,
                        },
                    })
                    .then((res) => {
                        if (res.data != "") {
                            setUserLike(true);
                        }
                    })
                    .catch((error) => {
                        console.log("エラー");
                    });
            })
            .catch((error) => {
                console.log("未ログイン");
            });
    }, []);

    let img;
    if (item.img_url2 == null) {
        img = "";
    } else if (item.img_url3 == null) {
        img = (
            <CardMedia
                component="img"
                height="194"
                image={item.img_url2}
                alt="Paella dish"
            />
        );
    } else {
        img = (
            <div className="md:flex md:justify-center w-full">
                <div className="flex justify-center w-full">
                    <img src={item.img_url2} />
                </div>
                <div className="flex justify-center w-full">
                    <img src={item.img_url3} />
                </div>
            </div>
        );
    }

    const [user, setUser] = useState(null);
    let userInfo;
    const showUser = () => {
        setUser(item.user_id);
    };
    const closeUser = (e) => {
        console.log(e);
        setUser(null);
    };
    if (user == null) {
        userInfo = "";
    } else {
        userInfo = (
            <UserInfo
                icon={profile.img_url}
                description={profile.description}
                postUserId={item.user_id}
                handleClick={closeUser}
            />
        );
    }

    const [review, setReview] = useState();
    let reviewInfo;
    const showReview = () => {
        setReview(item.user_id);
    };
    const closeReview = () => {
        setReview(null);
    };
    if (review == null) {
        reviewInfo = "";
    } else {
        reviewInfo = <Review postId={item.id} handleClick={closeReview} />;
    }

    let test;

    const pushLike = () => {
        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .post("api/detail/like", {
                        params: {
                            user_id: user.id,
                            post_id: props.detailId,
                        },
                    })
                    .then((res) => {
                        setLikes(res.data[0]);
                        setUserLike(res.data[1]);
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
                    toast.error("システムエラー。", {
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

    let favIcon;
    if (userLike) {
        favIcon = (
            <FavoriteIcon
                style={{
                    height: "40px",
                    width: "40px",
                    color: "red",
                }}
            />
        );
    } else {
        favIcon = (
            <FavoriteIcon
                style={{
                    height: "40px",
                    width: "40px",
                }}
            />
        );
    }

    // 通報関連処理
    const [open, setOpen] = React.useState(false);
    const [report, setReport] = useState('');
    const [review_id, setReviewId] = useState('');

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
                    post_id: props.detailId,
                    about: report,
                    review_id: '',
                    type: 2
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
            })
    }

    return (
        <div>
            <Card sx={{ width: 1 }}>
                {test}
                <CardHeader style={{ height: "10px" }} />
                <IconButton
                    onClick={() => props.handleClick("")}
                    style={{ height: "70px", width: "70px" }}
                    aria-label="add to favorites"
                >
                    <KeyboardReturnIcon
                        style={{ height: "40px", width: "40px" }}
                    />
                </IconButton>

                <CardHeader
                    style={{ height: "100px", fontSize: "40px" }}
                    avatar={
                        <Avatar
                            onClick={showUser}
                            src={profile.img_url}
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            style={{ height: "70px", width: "70px" }}
                        >
                            img
                        </Avatar>
                    }
                    action={
                        <IconButton
                            onClick={pushLike}
                            style={{ height: "70px", width: "70px" }}
                            aria-label="add to favorites"
                        >
                            {favIcon}
                            {likes}
                        </IconButton>
                    }
                    title={user2.name}
                    subheader="<- 投稿者を見る"
                />
                {userInfo}
                <CardMedia
                    component="img"
                    height="194"
                    image={item.img_url1}
                    alt="Paella dish"
                />
                {img}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        投稿日
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography fontSize={20} className="break-words">
                        {item.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton>
                        <NotificationImportantIcon fontSize="large" onClick={handleClickOpen} />
                    </IconButton>
                    <ExpandMore aria-label="show more" onClick={showReview}>
                        コメントを見る
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                {reviewInfo}
            </Card>

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
        </div>
    );
}

export default PostDetail;
