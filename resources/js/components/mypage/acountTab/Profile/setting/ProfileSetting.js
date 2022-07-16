import { LocalDining, Update } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PrivateSetting from "./PrivateSetting";

function ProfileSetting(props) {
    useEffect(() => {
        axios
            .get("api/ProfileShow")
            .then((res) => {
                const data = res.data;
                setId(data.id);
                setDescription(data.description);
                setIcon(data.img_url);
            })
            .catch((e) => {
                toast.error("システムエラー", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    });
    const [id, setId] = useState("");

    const [descriptionNew, setDescriptionNew] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");

    const getDescription = (event) => {
        setDescriptionNew(event.target.value);
    };
    const fileInput = React.createRef();

    //更新処理
    const changeProfile = async () => {
        //更新処理
        console.log(descriptionNew);
        const file = new FormData();
        file.append("id", id);

        if (descriptionNew === "") {
            file.append("description", description);
        } else {
            file.append("description", descriptionNew);
        }
        file.append("image", fileInput.current.files[0]);

        axios
            .post("api/profileUpdate", file, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    setDescription(descriptionNew);
                    console.log(response.data);
                    setIcon(response.data.img_url);

                    toast.success("更新に成功しました。", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((error) => {
                const { status, statusText } = error.response;

                if (status === 400) {
                    toast.error("紹介は250文字以内です。", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("システムエラー", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    };

    //戻る
    function backPage() {
        props.setSwich(true);
    }

    return (
        <>
            <Card className="w-full">
                <CardContent>
                    <div>プロフィール変更</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <Avatar
                        src={icon}
                        alt="profile"
                        sx={{ width: 160, height: 160 }}
                        className="m-auto"
                    />
                </CardContent>
                <CardContent className="flex justify-center">
                    <Button variant="outlined" component="label">
                        画像を更新
                        <input
                            hidden
                            type="file"
                            name="image"
                            ref={fileInput}
                            accept="image/*"
                        />
                    </Button>
                </CardContent>

                <CardContent>
                    <FormControl className="w-full" variant="standard">
                        <label>紹介メッセージ</label>
                        <TextField
                            className="w-full p-1"
                            id="outlined-multiline-static"
                            multiline
                            rows={9}
                            onChange={getDescription}
                            inputProps={{ style: { fontSize: 25, padding: 4 } }}
                            defaultValue={description}
                        />
                    </FormControl>
                </CardContent>

                <CardActions className="flex justify-end">
                    <button
                        onClick={backPage}
                        className="text-lg bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        戻る
                    </button>
                    <button
                        onClick={changeProfile}
                        className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
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
    );
}

export default ProfileSetting;
