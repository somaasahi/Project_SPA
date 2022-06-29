import { LocalDining, Update } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function PrivateSetting(props) {
    //user
    const [user, setUser] = useState('');
    //user取得
    useEffect(async () => {
        const data = await axios.get('api/user').then((res) => {
            setUser(res.data);
        })
    }, []);

    //postして送るデータ
    const [privateData, setPrivateData] = useState({
        img: '',
        name: '',
        email: ''
    });

    //各バリデーションメッセージ格納
    const [errorMessage, setErrorMessage] = useState({
        name: '名前は必須です',
        email: 'メールアドレスは必須です'
    });
    //error判定
    const [inputError, setInputError] = useState({
        img: false,
        email: false,
        password: false,
    });

    const getName = (event) => {
        const name = event.target.value;
        if (name == '') {
            setErrorMessage((prevState) => ({ ...prevState, name: '名前は必須です' }));
        } else if (name.langh > 255) {
            setErrorMessage((prevState) => ({ ...prevState, name: '名前は255文字以下で記載してください。' }));
        } else {
            setErrorMessage((prevState) => ({ ...prevState, name: '' }));
            setPrivateData((prevState) => ({ ...prevState, name: name }));
        }
    }
    const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    const getEmail = (event) => {
        const email = event.target.value;

        if (email == '') {
            setErrorMessage((prevState) => ({ ...prevState, email: 'メールアドレスは必須です' }));
        } else if (!pattern.test(email.value)) {
            setErrorMessage((prevState) => ({ ...prevState, email: 'メールアドレスは正しく記載してください。' }));
        } else {
            setErrorMessage((prevState) => ({ ...prevState, email: '' }));
            setPrivateData((prevState) => ({ ...prevState, email: email }));
        }
    }

    //更新処理
    const updatePrivate = async () => {
        const postData = {
            id: user.id,
            name: privateData.name,
            email: privateData.email
        };
        //プロフィールがあれば、更新処理
        let error1 = true;
        let error2 = true;
        //名前に変更がなければ更新前の値を入れなおす
        if (!privateData.name) {
            setErrorMessage((prevState) => ({ ...prevState, name: '' }));
            postData.name = user.name;
            error1 = false;
        }
        //メールアドレスに変更がなければ更新前の値を入れなおす
        if (!privateData.email) {
            setErrorMessage((prevState) => ({ ...prevState, email: '' }));
            postData.email = user.email;
            error2 = false;
        }
        //エラーメッセージ初期化
        setInputError((prevState) => ({ ...prevState, img: false, name: false, email: false }));

        //バリデーションチェック
        let check = 0;
        if (!error1) {
            true;
        } else if (errorMessage.name != '') {
            setInputError((prevState) => ({ ...prevState, name: true }));
            check++;
        }

        if (!error2) {
            true;
        } else if (errorMessage.email != '') {
            setInputError((prevState) => ({ ...prevState, email: true }));
            check++;
        }
        if (check > 0) {
            return false;
        }
        //更新処理
        await axios.post('api/user/updata', postData).then((res) => {
            if (res.data == true) {
                return toast.success(
                    "更新しました",
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
            }

            const errorList = res.data.message;
            let validMessage = '';
            errorList.forEach(error => {
                validMessage += error;
            });
            return toast.error(
                validMessage,
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
        })
    }

    //戻る
    function backPage() {
        props.setSwich(true);
    }

    if (!user) { return 'Loading...' };

    return (
        <Card className="w-full mt-3">
            <CardHeader
                title='個人情報設定'
            />
            <CardContent>
                <TextField
                    sx={{ width: 3 / 4 }}
                    error={inputError.name}
                    helperText={inputError.name && errorMessage.name}
                    id="filled-search"
                    label='名前'
                    type='text'
                    variant="standard"
                    onChange={getName}
                    defaultValue={user.name}
                    inputProps={{ style: { fontSize: 20 } }}
                />
            </CardContent>
            <CardContent>
                <TextField
                    sx={{ width: 3 / 4 }}
                    error={inputError.name}
                    helperText={inputError.name && errorMessage.name}
                    id="filled-search"
                    label='メールアドレス'
                    type='text'
                    variant="standard"
                    onChange={getEmail}
                    defaultValue={user.email}
                    inputProps={{ style: { fontSize: 20 } }}
                />
            </CardContent>

            <CardActions className="flex justify-end">
                <button onClick={updatePrivate} className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    変更
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
    )
}

export default PrivateSetting;
