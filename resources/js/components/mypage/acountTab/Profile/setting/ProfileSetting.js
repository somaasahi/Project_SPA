import { LocalDining, Update } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ProfileSetting(props) {

    //プロフィール情報の有無
    const [profileEmpty, setProfileEmpty] = useState({
        check: '',
        profileName: '',
        description: '',
    });

    //更新成功flug
    const [editFlug, setEditFlug] = useState(false);

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
        id: '',
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
        if (description.langh > 255) {
            setErrorMessage((prevState) => ({ ...prevState, description: '名前は255文字以下で記載してください。' }));
        } else {
            setErrorMessage((prevState) => ({ ...prevState, description: '' }));
            setProfillData((prevState) => ({ ...prevState, description: description }));
        }
    }

    //プロフィールデータ検索
    useEffect(async () => {
        await axios.get('api/ProfileShow/' + user.id).then((res) => {
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
    }, [user]);

    //更新処理
    const changeProfile = async () => {
        const data = {
            id: profillData.id ? profillData.id : user.id,
            img: profillData.img,
            name: profillData.name,
            description: profillData.description
        }
        console.log(user);
        //プロフィールがあれば、更新処理
        if (profileEmpty.profileName) {
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
            console.log(data);
            await axios.post('api/ProfileUpdate', data).then((res) => {
                if (res.data == true) {
                    setEditFlug(true);
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
                console.log(validMessage);
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
            //プロフィールがなければ新規追加処理
        } else {
            //エラーメッセージ初期化
            setInputError((prevState) => ({ ...prevState, img: false, name: false, description: false }));
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

            await axios.post('api/ProfileStor', data).then((res) => {
                if (res.data == true) {
                    return setEditFlug(true);
                }
                const errorList = res.data.message;
                let validMessage = '';
                errorList.forEach(error => {
                    validMessage += error;
                });
                console.log(validMessage);

                toast.error(
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
                )

            })
        }
    }

    function editPage() {
        if (editFlug) {
            location.reload();
        }
    }

    //戻る
    function backPage() {
        props.setSwich(true);
    }

    if (!user) { return 'Loading...' };

    return (
        <Card className="w-5/6">
            <CardHeader
            />
            <CardContent>
                <Avatar
                    image="storage/post_images/noimg.png"
                    alt="profile"
                    sx={{ width: 160, height: 160 }}
                    className='m-auto'
                />
            </CardContent>
            <CardContent>
                <TextField
                    className='w-full'
                    error={inputError.name}
                    helperText={inputError.name && errorMessage.name}
                    id="filled-search"
                    label='ニックネーム'
                    type='text'
                    variant="standard"
                    onChange={getName}
                    defaultValue={profileEmpty.profileName && profileEmpty.profileName}
                    inputProps={{ style: { fontSize: 40 } }}
                />
            </CardContent>
            <CardContent>
                <FormControl className='w-full' variant="standard">
                    <TextField
                        className='w-full'
                        id="outlined-multiline-static"
                        label="紹介メッセージ"
                        multiline
                        rows={9}
                        onChange={getDescription}
                        inputProps={{ style: { fontSize: 30 } }}
                        defaultValue={profileEmpty.description && profileEmpty.description}
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
            {editPage()}
        </Card>
    )
}

export default ProfileSetting;
