import { LocalDining, Update } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PrivateSetting from "./PrivateSetting";

function ProfileSetting(props) {

    //プロフィール情報の有無
    const [profileEmpty, setProfileEmpty] = useState({
        check: '',
        profileName: '',
        description: '',
    });

    //user
    const [user, setUser] = useState('');
    //user取得
    useEffect(async () => {
        await axios.get('api/user').then(async (res) => {
            setUser(res.data);
            //プロフィールデータ検索
            await axios.get('api/ProfileShow/' + res.data.id).then((res) => {
                const data = res.data;
                if (data[0].id == '') {
                    return false;
                }
                //あれば、デフォルトの設定で使う
                setProfileEmpty((prevState) => ({ ...prevState, check: (data[0].id) }));
                setProfileEmpty((prevState) => ({ ...prevState, profileName: (data[0].profileName) }));
                setProfileEmpty((prevState) => ({ ...prevState, description: (data[0].description) }));
                //プロフィールデータ検索用
                setProfillData((prevState) => ({ ...prevState, id: (data[0].id) }));
            }).catch((e) => {
                console.log(e.message);
            })
        })
    }, []);

    //postして送るデータ
    const [profillData, setProfillData] = useState({
        id: '',
        img: '',
        name: '',
        description: ''
    });

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
        if (description.langh > 255) {
            setErrorMessage((prevState) => ({ ...prevState, description: '名前は255文字以下で記載してください。' }));
        } else {
            setErrorMessage((prevState) => ({ ...prevState, description: '' }));
            setProfillData((prevState) => ({ ...prevState, description: description }));
        }
    }


    //更新処理
    const changeProfile = async () => {
        const data = {
            id: profillData.id ? profillData.id : user.id,
            img: profillData.img,
            name: profillData.name,
            description: profillData.description
        }

        //プロフィールがあれば、更新処理
        let error1 = true;
        let error2 = true;
        //名前に変更がなければ更新前の値を入れなおす
        if (!profillData.name) {
            setErrorMessage((prevState) => ({ ...prevState, name: '' }));
            data.name = profileEmpty.profileName;
            error1 = false;
        }
        //紹介メッセージに変更がなければ更新前の値を入れなおす
        if (!profillData.description) {
            setErrorMessage((prevState) => ({ ...prevState, description: '' }));
            data.description = profileEmpty.description;
            error2 = false;
        }

        //エラーメッセージ初期化
        setInputError((prevState) => ({ ...prevState, img: false, name: false, description: false }));
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
        } else if (errorMessage.description != '') {
            setInputError((prevState) => ({ ...prevState, description: true }));
            check++;
        }

        if (check > 0) {
            return false;
        }
        //更新処理
        await axios.post('api/ProfileUpdate', data).then((res) => {
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
        });
    }

    //戻る
    function backPage() {
        props.setSwich(true);
    }

    if (!user) { return 'Loading...' };

    return (
        <>
            <Card className="w-full">
                <CardContent>
                    <div>
                        プロフィール変更
                    </div>
                </CardContent>
                <Divider />
                <CardContent>
                    <Avatar
                        image="storage/post_images/noimg.png"
                        alt="profile"
                        sx={{ width: 160, height: 160 }}
                        className='m-auto'
                    />
                </CardContent>
                <CardContent>
                    <label>ニックネーム</label>
                    <TextField
                        className='w-full'
                        error={inputError.name}
                        helperText={inputError.name && errorMessage.name}
                        id="filled-search"
                        multiline
                        type='text'
                        variant="standard"
                        onChange={getName}
                        defaultValue={profileEmpty.profileName}
                        inputProps={{ style: { fontSize: 25, padding: 4 } }}
                    />
                </CardContent>
                <CardContent>
                    <FormControl className='w-full' variant="standard">
                        <label>紹介メッセージ</label>
                        <TextField
                            className='w-full p-1'
                            id="outlined-multiline-static"
                            multiline
                            rows={9}
                            onChange={getDescription}
                            inputProps={{ style: { fontSize: 25, padding: 4 } }}
                            defaultValue={profileEmpty.description}
                        />
                    </FormControl>
                </CardContent>

                <CardActions className="flex justify-end">
                    <button onClick={backPage} className="text-lg bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        戻る
                    </button>
                    <button onClick={changeProfile} className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        更新
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
            <PrivateSetting />
        </>
    )
}

export default ProfileSetting;
