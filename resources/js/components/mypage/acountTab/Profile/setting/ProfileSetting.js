import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import axios from "axios";
import React from "react";

function ProfileSetting(props) {
    // console.log(props);
    function backPage() {
        props.setSwich(true);
    }

    return (
        <Card className="w-4/5">
            <CardHeader>

            </CardHeader>
            <CardContent>
                <FormControl className="w-4/5" variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">名前</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={'ok'}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                </FormControl>
            </CardContent>
            <CardContent>
                <FormControl className="w-4/5" variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">名前</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={'ok'}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                </FormControl>
            </CardContent>
            <CardContent>
                <FormControl className="w-4/5" variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">名前</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={'ok'}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                </FormControl>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={backPage}>戻る</Button>
            </CardActions>
        </Card>
    )
}

export default ProfileSetting;
