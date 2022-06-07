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

    useEffect(() => {
        axios
            .get("api/detail/", {
                params: {
                    id: props.detailId,
                },
            })
            .then((res) => {
                const item = res.data;
                console.log(item);
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

    const [user, setUser] = useState();
    let userInfo;
    const showUser = () => {
        setUser(item.user_id);
    };
    const closeUser = () => {
        setUser(null);
    };
    if (user == null) {
        userInfo = "";
    } else {
        userInfo = (
            <UserInfo
                icon={profile.img_url}
                description={profile.description}
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

    const pushLike = () => {
        axios
            .post("api/detail/like", {
                params: {
                    user_id: 1,
                    post_id: props.detailId,
                },
            })
            .then((res) => {
                console.log(res.data);
                setLikes(res.data);
            })
            .catch((error) => {
                const { status, statusText } = error.response;
                alert(`Error! HTTP Status: ${status} ${statusText}`);
                // 存在しないidをパラメータにurl叩いたらlaravelから404ページ返す？
            });
    };

    return (
        <div>
            <Card sx={{ width: 1 }}>
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
                            // なかったときにnoimgを表示する処理
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
                            <FavoriteIcon
                                style={{ height: "40px", width: "40px" }}
                            />
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
                    <ExpandMore aria-label="show more" onClick={showReview}>
                        コメントを見る
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                {reviewInfo}
            </Card>
        </div>
    );
}

export default PostDetail;
