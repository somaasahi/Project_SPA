import React from "react";

function PostEdit(props) {
    return (
        <div>
            <p>idが{props.detailId}の編集画面</p>
            <div onClick={() => props.handleClick("")}>戻る</div>
        </div>
    );
}

export default PostEdit;
