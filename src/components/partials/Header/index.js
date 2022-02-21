import { Link } from 'react-router-dom'
import './header.css'

import { isLogged } from '../../../helpers/authHandle'
const Header = () => {
    let logged = isLogged();
    return (
        <header>
            <div className='container'>
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
                                        <Link to='/logout'>Sair</Link>
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
            </div>
        </header>
    )
}
export default Header