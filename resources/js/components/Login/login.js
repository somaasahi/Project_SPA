import { Avatar, Button, Card, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";



function Login() {

    return (
        <div>
            <Avatar
                alt="logo"
                src="storage/post_images/noimg.png"
                sx={{ width: 145, height: 145 }}
                className="m-auto mt-56"
            />
            <Card className="py-3 px-6 w-2/5 m-auto">
                <div className="my-2.5">
                    <TextField className="w-full" id="outlined-basic" label="メールアドレス" variant="outlined" />
                </div>
                <div>
                    <TextField className="w-full" id="outlined-basic" label="パスワード" variant="outlined" />
                </div>
                <div className="my-2.5 text-right">
                    <Button variant="contained">ログイン</Button>
                </div>
            </Card>
            <div className="w-2/5 m-auto text-right mt-2 text-cyan-400">
                <Link to={"/signUp"} >新規登録の方はこちらへ</Link>
            </div>


        </div>

    );
}

export default Login;

