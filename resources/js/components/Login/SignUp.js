import { Avatar, Button, Card, CardContent, CardHeader, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Navigate } from 'react-router-dom';


function SignUp() {

    //postして送るデータ
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    //一時的ユーザー情報格納
    const inputName = useRef(null);
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);

    //error判定
    const [inputError, setInputError] = useState({
        name: false,
        email: false,
        password: false,
    });
    //各バリデーションメッセージ格納
    const [nameError, setNameError] = useState('名前は必須です');
    const [emailError, setEmailError] = useState('メールアドレスは必須です');
    const [passwordError, setPasswordError] = useState('パスワードは必須です');


    const getName = () => {
        if (inputName.current) {
            const getName = inputName.current;
            if (getName.value == '') {
                setNameError('ユーザー名は必須です');
            } else if (getName.value.length > 255) {
                setNameError('ユーザー名は255文字以下で記載してください。');
            } else {
                setNameError('');
                setData((prevState) => ({ ...prevState, name: getName.value }));
            }
        }
    }


    const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const getEmail = (event) => {
        if (inputEmail.current) {
            const getEmail = inputEmail.current;
            if (getEmail.value == '') {
                setEmailError('メールアドレスは必須です');
            } else if (!pattern.test(getEmail.value)) {
                setEmailError('メールアドレスは正しく記載してください。');
            } else {
                setEmailError('');
                setData((prevState) => ({ ...prevState, email: getEmail.value }));
            }
        }
    }


    const getPassword = (event) => {
        if (inputPassword.current) {
            const getPassword = inputPassword.current;
            if (getPassword.value == '') {
                setPasswordError('パスワードは必須です');
            } else if (getPassword.value.length < 8) {
                setPasswordError('パスワードは８文字以上で記載してください');
            } else {
                setPasswordError('');
                setData((prevState) => ({ ...prevState, password: getPassword.value }));
            }
        }

    }

    //登録処理
    const postData = async () => {
        //初期化
        setInputError((prevState) => ({ ...prevState, name: false, email: false, password: false }));
        //バリデーションチェック
        let check = 0;
        if (nameError != '') {
            setInputError((prevState) => ({ ...prevState, name: true }));
            check++;
        }
        if (emailError != '') {
            setInputError((prevState) => ({ ...prevState, email: true }));
            check++;
        }

        if (passwordError != '') {
            setInputError((prevState) => ({ ...prevState, password: true }));
            check++;
        }

        if (check > 0) {
            return false;
        } else {
            //登録処理
            await axios.post('/api/user', data).then(() => {
                setPostCheck(true);

            }).catch((error) => {
                console.log(error);
            });
        }

    }

    //リダイレクト判定
    const [postCheck, setPostCheck] = useState('');

    //登録成功時ログイン画面へ
    const pageChack = () => {
        if (postCheck) {
            return <Navigate to='/login' />
        }
    }

    return (
        <>
            <Card className="py-3 px-6 w-2/5 m-auto">
                <CardHeader title="新規登録" />
                <CardContent>
                    <div className="my-2.5">
                        <TextField
                            error={inputError.name}
                            className="w-full"
                            id="outlined-basic"
                            label="ユーザー名"
                            variant="outlined"
                            helperText={inputError.name && nameError}
                            inputRef={inputName}
                            onChange={getName}
                        />
                    </div>
                    <div className="my-2.5">
                        <TextField
                            error={inputError.email}
                            className="w-full"
                            id="outlined-basic"
                            label="メールアドレス"
                            variant="outlined"
                            helperText={inputError.email && emailError}
                            inputRef={inputEmail}
                            onChange={getEmail}
                            type="email"
                        />
                    </div>
                    <div className="my-2.5">
                        <TextField
                            error={inputError.password}
                            className="w-full"
                            id="outlined-basic"
                            label="パスワード"
                            variant="outlined"
                            helperText={inputError.password && passwordError}
                            inputRef={inputPassword}
                            onChange={getPassword}
                            type="password"
                        />
                    </div>
                    <div className="my-2.5 text-right">
                        <Button
                            variant="contained"
                            onClick={postData}
                        >
                            登録
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {pageChack()}
        </>
    );
}

export default SignUp;
