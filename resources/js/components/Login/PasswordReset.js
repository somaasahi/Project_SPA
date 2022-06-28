import { Button, Card, CardHeader, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function PasswordReset() {
    const [email, setEmail] = useState('');

    //各バリデーションメッセージ格納
    const [errorMessage, setErrorMessage] = useState('メールアドレスは必須です');
    //error判定
    const [inputError, setInputError] = useState(false);

    const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const getEmail = (event) => {
        const emailData = event.target.value;
        if (emailData == '') {
            setErrorMessage('メールアドレスは必須です');
        } else if (!pattern.test(emailData)) {
            setErrorMessage('メールアドレスは正しく記載してください。');
        } else {
            setErrorMessage('');
            setEmail(emailData);
        }
    }

    const handleSubmit = async () => {
        //初期化
        setInputError(false);

        //バリデーションチェック
        let check = 0;
        if (errorMessage != '') {
            setInputError(true);
            check++;
        }

        if (check > 0) {
            return false;
        }

        const data = { email: email }
        await axios.post('api/forgot-password', data).then((res) => {
            setEmail('');
            return toast.success(
                "送信しました！",
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
        }).catch((res) => {

        });
    }

    return (
        <div>
            <Card className="py-3 px-6 w-2/5 m-auto my-36">
                {/* <form action="" onSubmit={handleSubmit}> */}
                <CardHeader title='パスワードリセット' />
                <div className="my-2.5">
                    <TextField
                        error={inputError}
                        className="w-full"
                        id="outlined-basic"
                        label="メールアドレス"
                        variant="outlined"
                        helperText={inputError && errorMessage}
                        onChange={getEmail}
                        type={"email"}
                    />
                </div>

                <div className="my-2.5 text-right">
                    <Button onClick={handleSubmit} variant="contained" >送信</Button>
                </div>
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
                {/* </form> */}
            </Card>
        </div>

    )
}

export default PasswordReset;
