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
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        axios
            .get("api/detail/", {
                params: {
                    id: props.detailId,
                },
            })
            .then((res) => {
                const item = res.data;
                setItem(item);
                console.log(item);
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
        console.log("ok");
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
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            style={{ height: "70px", width: "70px" }}
                        >
                            img
                        </Avatar>
                    }
                    action={
                        <IconButton
                            style={{ height: "70px", width: "70px" }}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon
                                style={{ height: "40px", width: "40px" }}
                            />
                        </IconButton>
                    }
                    title="user_name"
                    subheader="投稿者を見る"
                />
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
                    <Typography fontSize={20}>
                        投稿の詳細入るよ Heat oil in a (14- to 16-inch) paella
                        pan or a large, deep skillet over medium-high heat. Add
                        chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes.
                        Transfer shrimp to a large plate and set aside, leaving
                        chicken and chorizo in the pan. Add pimentón, bay
                        leaves, garlic, tomatoes, onion, salt and pepper, and
                        cook, stirring often until thickened and fragrant, about
                        10 minutes. Add saffron broth and remaining 4 1/2 cups
                        chicken broth; bring to a boil.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore aria-label="show more">
                        コメントを見る
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            </Card>
        </div>
    );
}

export default PostDetail;
