import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from "react-query/devtools";
import Home from './home/Home';
import Mypage from './mypage/Mypage';
import Navigation from './Navigation';
import Login from './Login/login';
import SignUp from './Login/SignUp';
import ProtectedRoute from './ProtectedRoute';

const queryClient = new QueryClient();

function App() {

    const [authUser, setAuthUser] = useState(false);
    console.log(authUser);
    return (
        <Box>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navigation />
                    <main className={"m-5"}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/mypage"
                                element=
                                {
                                    <ProtectedRoute user={authUser}>
                                        <Mypage />
                                    </ProtectedRoute>
                                } />
                            <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
                            <Route path="/signUp" element={<SignUp />} />
                        </Routes>
                    </main>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Box>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
