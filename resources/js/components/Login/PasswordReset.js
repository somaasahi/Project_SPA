import { Button, Card, CardHeader, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function PasswordReset() {
    const [email, setEmail] = useState('');

    function getEmail(e) {
        setEmail(e.target.value);
        // console.log(e.target.value);
    }

    const handleSubmit = async () => {
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
        }).catch((e) => {
            console.log(e.message);
        });
    }

    return (
        <div>
            <Card className="py-3 px-6 w-2/5 m-auto my-36">
                {/* <form action="" onSubmit={handleSubmit}> */}
                <CardHeader title='パスワードリセット' />
                <div className="my-2.5">
                    <TextField
                        // error={inputError.email}
                        className="w-full"
                        id="outlined-basic"
                        label="メールアドレス"
                        variant="outlined"
                        // helperText={inputError.email && errorMessage.email}
                        onChange={getEmail}
                        type={"email"}
                        value={email}
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
