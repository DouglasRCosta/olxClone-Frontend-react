import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home/Home'
import Teste from './pages/Teste/Teste'
import React from "react";


export const MainRoutes = () => {
    return (
        <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path='/teste' element={<Teste />} />
        </Routes>
    )
}
