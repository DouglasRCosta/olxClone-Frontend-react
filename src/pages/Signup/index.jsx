import { useState } from 'react';

import './signup.css'
import useApi from '../../helpers/OlxApi'

import { useEffect } from 'react';
import { doLogin } from '../../helpers/authHandle';


const Page = () => {

    const api = useApi()

    let [email, setEmail] = useState('');
    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [state, setState] = useState('');

    let [disabled, setDisabled] = useState(false);
    let [error, setError] = useState('');
    let [statesFetch, setStatesFetch] = useState([]);


    useEffect(() => {
        let getStates = async () => {
            let listStates = await api.getStates()
            setStatesFetch(listStates.states);
        }
        getStates();
    }, [])

    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        setDisabled(true);

        if (password !== confirmPassword) {
            setError('Senhas Diferentes');
            setTimeout(() => setDisabled(false), 900);
            return;
        }

        const json = await api.register(name, email, password, state);


        if (json.error) {
            setError(JSON.stringify(json.error));

        } else {
            if (json.token !== undefined) {
                doLogin(json.token);
                window.location.href = '/';
            }
        }


        setTimeout(() => setDisabled(false), 900);

    }

    return (
        <div className="container">
            <div className="singin-container">

                <h1 className='cadastro-title'>Cadastro</h1>

                {error && <h2 className='error'>{error}</h2>}

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Nome Completo:</div>
                        <div className="area-input">
                            <input type="text" disabled={disabled} value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">E-mail:</div>
                        <div className="area-input">
                            <input type="email" disabled={disabled} value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Estado:</div>
                        <div className="area-input">
                            <select name="estado" value={state} id="select-estate" onChange={e => setState(e.target.value)} required>
                                <option></option>
                                {statesFetch.map((e, i) =>
                                    <option key={i} value={e._id}>{e.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Senha:</div>
                        <div className="area-input">
                            <input type="password" disabled={disabled} value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Confirmar Senha:</div>
                        <div className="area-input">
                            <input type="password" disabled={disabled} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Cadastrar</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}
export default Page