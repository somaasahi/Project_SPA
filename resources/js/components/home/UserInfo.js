import React, { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function UserInfo(props) {
    const [friend, setFriend] = useState(null);
    useEffect(() => {
        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .get("api/userInfo/checkFriend", {
                        params: {
                            from_user_id: user.id,
                            to_user_id: props.postUserId,
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                        setFriend(res.data);
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
                console.log("未ログイン");
            });
    }, []);

    const applyFriend = () => {
        axios
            .get("api/user/")
            .then((res) => {
                const user = res.data;
                axios
                    .post("api/userInfo/makeFriend", {
                        params: {
                            from_user_id: user.id,
                            to_user_id: props.postUserId,
                        },
                    })
                    .then((res) => {
                        setFriend(res.data);
                    })
                    .catch((error) => {
                        console.log("エラー");
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
                    alert(`Error! HTTP Status: ${status} ${statusText}`);
                }
            });
    };

    let message;
    if (friend == 3 || friend == null) {
        message = (
            <Button variant="contained" onClick={applyFriend}>
                フレンド申請を送る
            </Button>
        );
    }
    if (friend == 0) {
        message = <Button variant="contained">フレンド申請中</Button>;
    }
    if (friend == 1) {
        message = <Button variant="contained">既にフレンドです</Button>;
    }
    if (friend == 2) {
        message = <Button variant="contained">フレンドにはなれません</Button>;
    }
    return (
        <div>
            <div className="w-full md:flex m-3">
                <div className="md:w-1/2">
                    <img src={props.icon} />
                </div>
                <div className="p-3 md:w-1/2">
                    <p className="break-words">{props.description}</p>
                </div>
            </div>
            <div className="w-full p-4 md:flex">
                <div className="md:w-1/4">{message}</div>
                <div className="p-3 md:w-3/4">
                    <p className="break-words">
                        フレンド申請が許可されると個人チャットができます！
                    </p>
                </div>
            </div>
            <IconButton
                onClick={() => props.handleClick(null)}
                style={{ height: "70px", width: "70px" }}
                aria-label="add to favorites"
            >
                <KeyboardReturnIcon style={{ height: "40px", width: "40px" }} />
            </IconButton>
        </div>
    );
}

export default UserInfo;
