import {
    Card,
    CardActions,
    CardContent,
    FormControl,
    TextField,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import React from "react";
import axios from "axios";

function Inquiry(props) {
    const [message, setMessage] = React.useState("");
    const getMessage = (event) => {
        setMessage(event.target.value);
    };
    const backPage = () => {
        props.setSwich(true);
    };
    const sendMessage = () => {
        axios
            .post("api/sendMessage", { message: message })
            .then((res) => {
                toast.success(
                    "送信しました。ご登録のメールアドレスに回答をお送りさせて頂きます。",
                    {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );
                setMessage("");
            })
            .catch((error) => {
                const { status, statusText } = error.response;

                if (status === 400) {
                    toast.error("250文字以内です。", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("システムエラー", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    };

    return (
        <Card className="w-full">
            <CardContent>
                <FormControl className="w-full" variant="standard">
                    <label className="mb-7 mt-7">
                        管理者にメッセージを送る
                    </label>
                    <TextField
                        className="w-full p-1"
                        id="outlined-multiline-static"
                        multiline
                        rows={9}
                        onChange={getMessage}
                        inputProps={{ style: { fontSize: 25, padding: 4 } }}
                        value={message}
                    />
                </FormControl>
            </CardContent>
            <CardActions className="flex justify-end">
                <button
                    onClick={backPage}
                    className="text-lg bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    戻る
                </button>
                <button
                    onClick={sendMessage}
                    className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    送信
                </button>
            </CardActions>
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
        </Card>
    );
}

export default Inquiry;
