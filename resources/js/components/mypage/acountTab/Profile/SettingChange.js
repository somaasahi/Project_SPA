import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Inquiry from "./setting/Inquiry";
import PasswordSetting from "./setting/PasswordSetting";
import ProfileSetting from "./setting/ProfileSetting";
import PushSetting from "./setting/PushSetting";

function SettingChang(props) {


    // const [setting, setSetting] = useState('');

    // useEffect(() => {
    //     setSetting(props.setting)
    // }, [setting]);

    function settingShow() {
        if (props.setting == 'プロフィール編集') {
            return <ProfileSetting />
        }
        else if (props.setting == 'パスワード変更') {
            return <PasswordSetting />
        }
        else if (props.setting == 'ヘルプとサポート') {
            return <Inquiry />
        }
        else if (props.setting == 'push通知設定') {
            return <PushSetting />
        }
        else {
            return <Profile />
        }
    }
    return (
        <>
            {settingShow()}
        </>
    )
}

export default SettingChang;
