import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Inquiry from "./setting/Inquiry";
import PasswordSetting from "./setting/PasswordSetting";
import PrivateSetting from "./setting/PrivateSetting";
import ProfileSetting from "./setting/ProfileSetting";
import PushSetting from "./setting/PushSetting";

function SettingChang(props) {

    const [swich, setSwich] = useState(false);

    useEffect(() => {
        if (swich == true) {
            props.setSwich(false);
            props.setSetting('');
        }
    }, [swich]);

    function settingShow() {
        if (props.setting == 'プロフィール編集') {
            return <ProfileSetting setSwich={setSwich} />
        }
        else if (props.setting == '個人情報編集') {
            return <PrivateSetting setSwich={setSwich} />
        }
        else if (props.setting == 'パスワード変更') {
            return <PasswordSetting setSwich={setSwich} />
        }
        else if (props.setting == 'ヘルプとサポート') {
            return <Inquiry setSwich={setSwich} />
        }
        else if (props.setting == 'push通知設定') {
            return <PushSetting setSwich={setSwich} />
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
