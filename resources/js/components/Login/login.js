import { Avatar, Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login(props) {
    //一時的ユーザー情報格納
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);

    //postして送るデータ
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    //各バリデーションメッセージ格納
    const [errorMessage, setErrorMessage] = useState({
        email: 'メールアドレスは必須です',
        password: 'パスワードは必須です'
    })

    //error判定
    const [inputError, setInputError] = useState({
        email: false,
        password: false,
    });

    // ログインチェック
    const [loginCheck, setLoginCheck] = useState(false);

    const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const getEmail = () => {
        if (inputEmail.current) {
            const email = inputEmail.current;
            if (email.value == '') {
                setErrorMessage((prevState) => ({ ...prevState, email: 'メールアドレスは必須です' }));
            } else if (!pattern.test(email.value)) {
                setErrorMessage((prevState) => ({ ...prevState, email: 'メールアドレスは正しく記載してください。' }));
            } else {
                setErrorMessage((prevState) => ({ ...prevState, email: '' }));
                setData((prevState) => ({ ...prevState, email: email.value }));
            }
        }
    }
    useEffect(async () => {
        //プロフィールデータ検索
        await axios.get('api/mail/sendMail').then((res) => {

        }).catch((e) => {
            console.log(e.message);
        })
    }, [data]);

    const getPassword = () => {
        if (inputPassword.current) {
            const password = inputPassword.current;
            if (password.value == '') {
                setErrorMessage((prevState) => ({ ...prevState, password: 'パスワードは必須です' }));
            } else if (password.value.length < 8) {
                setErrorMessage((prevState) => ({ ...prevState, password: 'パスワードは８文字以上で記載してください' }));
            } else {
                setErrorMessage((prevState) => ({ ...prevState, password: '' }));
                setData((prevState) => ({ ...prevState, password: password.value }));
            }
        }
    }

    //ログイン処理
    const login = async () => {
        //初期化
        setInputError((prevState) => ({ ...prevState, name: false, email: false, password: false }));

        //バリデーションチェック
        let check = 0;
        if (errorMessage.email != '') {
            setInputError((prevState) => ({ ...prevState, email: true }));
            check++;
        }
        if (errorMessage.password != '') {
            setInputError((prevState) => ({ ...prevState, password: true }));
            check++;
        }
        if (check > 0) {
            return false;
        }

        //登録処理
        // CSRF保護の初期化
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
            .then((response) => {
                axios.post('api/login', data, { withCredentials: true })
                    .then((response) => {
                        setLoginCheck(true);
                        props.setAuthUser(true);
                    }).catch((e) => {
                        return toast.error(
                            "ログインに失敗しました。",
                            {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            })
                    })
            })
    }

    //ログイン成功時にmypage画面へ
    const pageChack = () => {
        if (loginCheck) {
            return <Navigate to='/mypage' />
        }
    }

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
                    <TextField
                        error={inputError.email}
                        className="w-full"
                        id="outlined-basic"
                        label="メールアドレス"
                        variant="outlined"
                        helperText={inputError.email && errorMessage.email}
                        inputRef={inputEmail}
                        onChange={getEmail}
                        type={"email"}
                    />
                </div>
                <div>
                    <TextField
                        error={inputError.password}
                        className="w-full"
                        id="outlined-basic"
                        label="パスワード"
                        variant="outlined"
                        helperText={inputError.password && errorMessage.password}
                        inputRef={inputPassword}
                        onChange={getPassword}
                        type="password"
                    />
                </div>
                <div className="my-2.5 text-right">
                    <Button variant="contained" onClick={login}>ログイン</Button>
                </div>
            </Card>
            <div className="w-2/5 m-auto text-right mt-2 text-cyan-400">
                <Link to={"/signUp"} >新規登録の方はこちらへ</Link>
            </div>
            <div className="w-2/5 m-auto text-right mt-2 text-cyan-400">
                <Link to={"/passwordReset"} >パスワードお忘れの方はこちらへ</Link>
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

            {pageChack()}
        </div>

    );
}

export default Login;

