import { useState } from 'react';
import './singin.css'

import useApi from '../../helpers/OlxApi'
import { doLogin } from '../../helpers/authHandle'
import { PageContainer } from '../../components/MainComponents';
const Page = () => {
    let api = useApi()

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [remember, setRemember] = useState('');
    let [disabled, setDisabled] = useState(false);
    let [error, setError] = useState('');


    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        setDisabled(true);

        const json = await api.login(email, password);

        console.log(json)

        if (json.error) {
            try {
                if (json.error.email.msg) {
                    setError(json.error.email.msg);
                    setTimeout(() => setDisabled(false), 900);
                    return
                }

            } catch (error) {

            }

            setError(json.error);

        } else {
            if (json.token !== undefined) {
                doLogin(json.token, remember);
                window.location.href = '/';
            }
        }


        setTimeout(() => setDisabled(false), 900);

    }
    return (
        <PageContainer>
            <div className="signin-container">

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
        </PageContainer>

    );
}

export default Page;