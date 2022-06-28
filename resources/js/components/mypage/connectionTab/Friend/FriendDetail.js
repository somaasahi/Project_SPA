import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SendIcon from "@mui/icons-material/Send";

function FriendDetail(props) {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        axios
            .get("api/mypage/friendDetail", {
                params: {
                    user_id: props.id,
                },
            })
            .then((res) => {
                const result = res.data;

                setName(result[0].name);
                setImg(result[1].img_url);
                setDescription(result[1].description);
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

        axios
            .get("api/mypage/chat", {
                params: {
                    user_id: props.id,
                },
            })
            .then((res) => {

                setChat(res.data);
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

    const [message, setMessage] = useState("");
    const messageChange = (event) => {
        setMessage(event.target.value);
    };
    const sendChat = () => {
        axios
            .post("api/mypage/chat", {
                params: {
                    to_user_id: props.id,
                    message: message,
                },
            })
            .then((res) => {

                setChat([...chat, res.data]);
                setMessage("");
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
    };

    return (
        <div>
            <IconButton
                onClick={() => props.setId("")}
                style={{ height: "70px", width: "70px" }}
                aria-label="add to favorites"
            >
                <KeyboardReturnIcon style={{ height: "40px", width: "40px" }} />
            </IconButton>
            <div className="w-full md:flex m-3">
                <div className="md:w-1/2">
                    <img src={img} />
                </div>
                <div className="p-3 md:w-1/2">
                    <p className="text-lg mb-3">{name}</p>
                    <p className="break-words">{description}</p>
                </div>
            </div>
            {/* チャット */}
            <div className="w-full p-3 border border-lime-600 rounded-md">
                <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                    <ul className="space-y-2">
                        {/* justify-start 左    justify-end 右 */}
                        {chat.map((value) => (
                            <li
                                key={value.id}
                                className={
                                    value.to_user_id == props.id
                                        ? "flex justify-end"
                                        : "flex justify-start"
                                }
                            >
                                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                    <span className="block">{value.chat}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                    <input
                        type="text"
                        placeholder="Message"
                        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                        name="message"
                        required
                        onChange={messageChange}
                        value={message}
                    />

                    <IconButton onClick={sendChat}>
                        <SendIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default FriendDetail;
