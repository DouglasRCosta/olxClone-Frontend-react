import { Outlet } from 'react-router-dom'
import { isLogged } from '../helpers/authHandle'
let auth = () => {
    let logged = isLogged()
    return logged;
}
let privateRouter = () => {
    let free = auth()
    return (free) ? <Outlet /> : window.location.href='/singin';
}

export default privateRouter