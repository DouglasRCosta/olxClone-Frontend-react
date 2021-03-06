import { Link } from 'react-router-dom'
import './header.css'

import { isLogged } from '../../../helpers/authHandle'
import { PageContainer } from '../../MainComponents';
import Cookies from 'js-cookie';
const Header = () => {
    let logged = isLogged();

    let handlerLogout = ()=>{
        Cookies.remove('token');
        window.location.href = '/'
    }
    return (
        <header>
            <PageContainer>
                <div className='header-container'>
                    <div className='logo'>
                        <Link to="/">
                            <span className='logo-1'>O</span>
                            <span className='logo-2'>L</span>
                            <span className='logo-3'>X</span>
                        </Link>
                    </div>
                    <nav>
                        <ul>
                            {logged &&
                                <>
                                    <li>
                                        <Link to='/myaccount'>Minha Conta</Link>
                                    </li>
                                    <li>
                                        <button onClick={handlerLogout}>Sair</button>
                                    </li>
                                    <li>
                                        <Link to='/postad' className='postar-button'>Postar anúncio</Link>
                                    </li>
                                </>
                            }
                            {!logged &&
                                <>
                                    <li>
                                        <Link to='/singin'>Login</Link>
                                    </li>
                                    <li>
                                        <Link to='/singup'>Cadastrar</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </PageContainer>
        </header>
    )
}
export default Header