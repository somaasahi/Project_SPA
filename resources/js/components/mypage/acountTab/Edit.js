import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
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

function Edit(props) {
    let text;
    if (props.content.content.length > 45) {
        text = props.content.content.substr(0, 70) + "....";
    } else {
        text = props.content.content;
    }

    return (
        <Card className="">
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
                <IconButton aria-label="add to favorites">
                    <DeleteIcon style={{ height: "30px", width: "30px" }} />
                    削除
                </IconButton>
                <ExpandMore
                    aria-label="show more"
                    onClick={() => props.handleClick(props.content.id)}
                >
                    編集
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    );
}

export default Edit;
