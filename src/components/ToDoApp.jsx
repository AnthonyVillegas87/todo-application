import './ToDoApp.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LogoutComponent from './LogoutComponent';
// import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodoComponent from "./ListTodoComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthenticationProvider, {useAuth} from "../security/AuthenticationContext";
import React from "react";

function AuthenticatedRoute({children}) {
    const authContext = useAuth()

    if(authContext.isAuthenticated) return children


    return <Navigate to="/"/>
}

export default function ToDoApp() {
    return (
        <div className="ToDoApp">
            <AuthenticationProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                        <Routes>
                            <Route path='/' element={<LoginComponent/>} />
                            <Route path='/login' element={<LoginComponent/>} />

                            <Route path='/welcome/:username' element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent/>
                                </AuthenticatedRoute>
                            } />

                            <Route path='/todos' element={
                                <AuthenticatedRoute>
                                    <ListTodoComponent/>
                                </AuthenticatedRoute>

                            }/>

                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent/>
                                </AuthenticatedRoute>
                                }/>

                            <Route path='*' element={<ErrorComponent/>}></Route>
                        </Routes>

                </BrowserRouter>
            </AuthenticationProvider>
        </div>
    )
}












