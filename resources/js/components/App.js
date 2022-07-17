import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Mypage from "./mypage/Mypage";
import Navigation from "./Navigation";
import Login from "./Login/login";
import SignUp from "./Login/SignUp";
import ProtectedRoute from "./Login/ProtectedRoute";
import { authCheck } from "./Login/AuthCheck";
import PasswordReset from "./Login/PasswordReset";
import About from "./About";


function App() {
    //trueなら認証している
    const [authUser, setAuthUser] = useState(false);
    //リロードされた時認証の確認
    if (window.performance) {
        if (window.performance.navigation.type === 1) {
            authCheck().then((result) => {
                setAuthUser(result);
            });
        }
    }
    //1分毎に認証されているかの確認
    useEffect(() => {
        setInterval(
            () =>
                authCheck().then((result) => {
                    setAuthUser(result);
                }),
            60000
        );
    }, []);

    return (
        <Box>
                <BrowserRouter>
                    <Navigation authUser={authUser} setAuthUser={setAuthUser} />
                    <main className={"m-5"}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/mypage" element={<Mypage />} />
                            <Route
                                path="/login"
                                element={<Login setAuthUser={setAuthUser} />}
                            />
                            <Route path="/signUp" element={<SignUp />} />
                            <Route
                                path="/passwordReset"
                                element={<PasswordReset />}
                            />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                </BrowserRouter>
        </Box>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
