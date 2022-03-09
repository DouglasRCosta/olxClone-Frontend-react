import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import React from "react";
import { NotFound } from './pages/NotFound/NotFound';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Adpage from './pages/Adpage'
import AddPost from './pages/Postad'
import Adlist from './pages/Adlist'
import RouterPrivate from './components/RouterPrivate';
export const MainRoutes = () => {
    return (
        <Routes>
            { /*Free*/}

            <Route path="/" element={<Home />} />
            <Route path='/ad/:id' element={<Adpage />} />
            <Route path='/adlist' element={<Adlist />} />
            <Route path='/singin' element={<Signin />} />
            <Route path='/singup' element={<Signup />} />
            { /*Private*/}
            
            <Route element={<RouterPrivate />}>
                <Route path='/postad' element={<AddPost />} />

            </Route>
           { /*NotFound*/}
            <Route path='*' element={<NotFound />} />

        </Routes>

    )
}
