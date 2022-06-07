import { Update } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";

function ProfileSetting(props) {
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
        console.log('ok');
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

    return (
        <Card className="w-4/5">
            <CardHeader
                avatar={
                    <Avatar
                        image="storage/post_images/noimg.png"
                        alt="profile"
                        sx={{ width: 80, height: 80 }}
                        className=''
                    />
                }
                title="画像を選択してください"
            />
            <CardContent>
                <TextField
                    error={inputError.name}
                    helperText={inputError.name && errorMessage.name}
                    id="filled-search"
                    label='ニックネーム'
                    type='text'
                    variant="standard"
                    onChange={getName}
                />
            </CardContent>
            <CardContent>
                <FormControl className="w-4/5" variant="standard">
                    <TextField
                        id="outlined-multiline-static"
                        label="紹介メッセージ"
                        multiline
                        rows={6}
                        onChange={getDescription}
                    />
                </FormControl>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={backPage}>戻る</Button>
                <Button size="small" onClick={updateProfile}>更新する</Button>
            </CardActions>
        </Card>
    )
}

export default ProfileSetting;
