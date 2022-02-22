import { useState } from 'react';
import './singin.css'

import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/authHandle'
const Page = () => {
    let api = useApi()

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [remember, setRemember] = useState('');
    let [disabled, setDisabled] = useState(false);
    let [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        const json = await api.login(email, password);

        if (json.error) {
            setError(json.error);
            setTimeout(()=>setDisabled(false),900);
        } else {
            doLogin(json.token, remember);
            window.location.href = '/';
        }




    }
    return (
        <div className="container">
            <div className="singin-container">

                <h1 className='login-title'>Login</h1>

                {error && <h2 className='error'>{error}</h2>}

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">E-mail:</div>
                        <div className="area-input">
                            <input type="email" disabled={disabled} value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Senha:</div>
                        <div className="area-input">
                            <input type="password" disabled={disabled} value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Lembra Senha:</div>
                        <div className="area-input">
                            <input type="checkbox" disabled={disabled} checked={remember} onChange={() => setRemember(!remember)} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Login</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Page;