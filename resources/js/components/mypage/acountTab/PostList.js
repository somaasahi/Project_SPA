import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ToastContainer, toast } from "react-toastify";
import { useStateIfMounted } from "use-state-if-mounted";
import PostDetail from "../../home/PostDetail";
import Post from "./Post";

function PostList() {
    const [posts, setPosts] = useStateIfMounted([]);
    useEffect(() => {
        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .get("api/mypage/postlist", {
                        params: {
                            user_id: user.id,
                        },
                    })
                    .then((res) => {
                        const results = res.data;
                        console.log(results);
                        setPosts([...posts, ...results]);
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
    }, []);

    const [detailId, setDetailId] = useState("");
    const handleSetDetailId = (event) => {
        setDetailId(event);
    };
    let content;
    if (detailId == "") {
        content = (
            <div className="overflow-auto" style={{ height: "1000px" }}>
                <div className="w-full h-full">
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            content={post}
                            handleClick={handleSetDetailId}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        content = (
            <PostDetail
                detailId={detailId}
                handleClick={handleSetDetailId}
                class="bg-orange-200"
                style={{ height: "1000px" }}
            />
        );
    }

    return (
        <div>
            <div id="content">{content}</div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default PostList;
