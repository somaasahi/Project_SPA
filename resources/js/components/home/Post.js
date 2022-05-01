import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";

function Post(props) {
    return (
        <ImageListItem>
            <img
                src={props.content.img_url1}
                srcSet={props.content.img_url1}
                alt="test"
                loading="lazy"
            />
            <ImageListItemBar
                className="h-1/4"
                title={props.content.content}
                actionIcon={
                    <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label="test"
                    >
                        <InfoIcon />
                    </IconButton>
                }
            />
        </ImageListItem>
    );
}

export default Post;
