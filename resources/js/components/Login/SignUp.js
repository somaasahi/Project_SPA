import { Avatar, Button, Card, TextField } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";




function SignUp() {

    return (
        <>
            <Card className="py-3 px-6 w-2/5 m-auto">
                <div className="my-2.5">
                    <TextField className="w-full" id="outlined-basic" label="ユーザー名" variant="outlined" />
                </div>
                <div className="my-2.5">
                    <TextField className="w-full" id="outlined-basic" label="メールアドレス" variant="outlined" />
                </div>
                <div className="my-2.5">
                    <TextField className="w-full" id="outlined-basic" label="パスワード" variant="outlined" />
                </div>
                <div className="my-2.5 text-right">
                    <Button variant="contained">新規登録</Button>
                </div>
            </Card>
        </>

    );
}

export default SignUp;
