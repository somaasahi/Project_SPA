import { Avatar, Button, Card, CardContent, CardHeader, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";


function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getName = (event) => {
        setTimeout(() => {
            setName(event.target.value);
        }, 5000)
    }

    const getEmail = (event) => {
        setTimeout(() => {
            setEmail(event.target.value);
        }, 5000)
    }

    const getPassword = (event) => {
        setTimeout(() => {
            setPassword(event.target.value);
        }, 5000)
    }

    const postData = () => {

    }

    return (
        <>
            <Card className="py-3 px-6 w-2/5 m-auto">
                <CardHeader title="新規登録" />
                <CardContent>
                    <div className="my-2.5">
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            label="ユーザー名"
                            variant="outlined"
                            onChange={getName}
                        />
                    </div>
                    <div className="my-2.5">
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            label="メールアドレス"
                            variant="outlined"
                            onChange={getEmail}
                        />
                    </div>
                    <div className="my-2.5">
                        <TextField
                            className="w-full"
                            id="outlined-basic"
                            label="パスワード"
                            variant="outlined"
                            onChange={getPassword}
                        />
                    </div>
                </CardContent>
                <div className="my-2.5 text-right">
                    <Button
                        variant="contained"
                    // onClick={postData}
                    >
                        登録
                    </Button>
                </div>
            </Card>
        </>

    );
}

export default SignUp;
