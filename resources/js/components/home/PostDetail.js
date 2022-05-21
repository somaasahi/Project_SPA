import React from "react";

function PostDetail(props) {
    console.log(props.detailId);

    return (
        <div onClick={() => props.handleClick("")}>
            投稿のid:{props.detailId}::::クリックしたら一覧に戻る
        </div>
    );
}

export default PostDetail;
