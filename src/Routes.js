import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home/Home'
import React from "react";
import { NotFound } from './pages/NotFound/NotFound';
import Signin from './pages/Signin'
import Signup from './pages/Signup'

export const MainRoutes = () => {
    return (
        <Routes>
            <Route  path="/" element={<Home />} />
           
            <Route  path='/singin' element={<Signin/>} />
            <Route  path='/singup' element={<Signup/>} />
            <Route  path='*' element={<NotFound />} />

        </Routes>
    )
}
