import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

function Post(props) {
    let text;
    if (props.content.content.length > 45) {
        text = props.content.content.substr(0, 45) + "....";
    } else {
        text = props.content.content;
    }

    return (
        <Card className="">
            {/* 必要か迷い中 */}
            <CardHeader
                avatar={
                    <Avatar
                        src={props.content.img_url}
                        aria-label="recipe"
                        style={{ height: "70px", width: "70px" }}
                    >
                        img
                    </Avatar>
                }
                title={props.content.name}
                subheader={props.content.created_at}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.content.img_url1}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    aria-label="show more"
                    onClick={() => props.handleClick(props.content.id)}
                >
                    詳細を見る
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
}

export default Post;
