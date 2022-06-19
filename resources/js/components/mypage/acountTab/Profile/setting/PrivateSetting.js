import { LocalDining, Update } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

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
    const [profillData, setProfillData] = useState({
        img: '',
        name: '',
        description: ''
    });

    const [name, setName] = useState('');

    //各バリデーションメッセージ格納
    const [errorMessage, setErrorMessage] = useState({
        name: '名前は必須です',
        password: ''
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
            setProfillData((prevState) => ({ ...prevState, name: name }));
        }
    }

    const getDescription = (event) => {
        const description = event.target.value;
        console.log(description);
        if (description.langh > 255) {
            setErrorMessage((prevState) => ({ ...prevState, description: '名前は255文字以下で記載してください。' }));
        } else {
            setErrorMessage((prevState) => ({ ...prevState, description: '' }));
            setProfillData((prevState) => ({ ...prevState, description: description }));
        }
    }

    //更新処理
    const updateProfile = () => {
        //エラーメッセージ初期化
        setInputError((prevState) => ({ ...prevState, img: false, name: false, description: false }));
        console.log(errorMessage);
        //バリデーションチェック
        let check = 0;
        if (errorMessage.name != '') {
            setInputError((prevState) => ({ ...prevState, name: true }));
            check++;
        }
        if (errorMessage.description != '') {
            setInputError((prevState) => ({ ...prevState, description: true }));
            check++;
        }
        if (check > 0) {
            return false;
        }

        return alert(profillData);
    }

    //戻る
    function backPage() {
        props.setSwich(true);
    }

    if (!user) { return 'Loading...' };

    return (
        <Card className="w-5/6">
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
                    onChange={getName}
                    defaultValue={user.email}
                    inputProps={{ style: { fontSize: 20 } }}
                />
            </CardContent>

            <CardActions className="flex justify-end">
                <button onClick={backPage} className="text-lg bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    戻る
                </button>
                <button onClick={updateProfile} className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    変更
                </button>
            </CardActions>
        </Card>
    )
}

export default PrivateSetting;
