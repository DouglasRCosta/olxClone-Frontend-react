import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home/Home'
import Teste from './pages/Teste/Teste'
import React from "react";
import { NotFound } from './pages/NotFound/NotFound';
import Signin from './pages/Singin'

export const MainRoutes = () => {
    return (
        <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path='/teste' element={<Teste />} />
            <Route  path='/singin' element={<Signin/>} />
            <Route  path='*' element={<NotFound />} />

        </Routes>
    )
}
