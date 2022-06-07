import React, { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

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
        console.log(props.postId);
        axios
            .post("api/detail/review", {
                params: {
                    post_id: props.postId,
                    comment: comment,
                },
            })
            .then((res) => {
                const results = res.data;
                setReview(results);
            })
            .catch((error) => {
                console.log(props.postId);
                const { status, statusText } = error.response;
                alert(`Error! HTTP Status: ${status} ${statusText}`);
            });
    };

    let noreview;
    if (reviews == "") {
        noreview = <p>コメントはありません</p>;
    } else {
        noreview = "";
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
                                img
                            </Avatar>
                        </div>
                        <div className="ml-4 px-7 border-2 rounded-md w-full inline-block align-middle">
                            <p className="">{review.comment}</p>
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
        </div>
    );
}

export default Review;
