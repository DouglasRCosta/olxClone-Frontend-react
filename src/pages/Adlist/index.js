import './adlist.css'
import { PageContainer } from '../../components/MainComponents';
import { useEffect, useState } from 'react';

import useApi from '../../helpers/OlxApi'
import { useLocation, useNavigate } from 'react-router-dom';

const AdList = () => {


    let api = useApi();
    let nav = useNavigate();


    let useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQueryString();

    let [stateList, setStateList] = useState([]);
    let [categoriesList, setCategoriesList] = useState([]);


    let [q, setQ] = useState((query.get('q')) != null ? query.get('q') : '')
    let [cat, setCat] = useState((query.get('cat')) != null ? query.get('cat') : '')
    let [state, setState] = useState((query.get('state')) != null ? query.get('state') : '')

    useEffect(() => {
        let replace = [];
        if (q) {
            replace.push(`q=${q}`)
        }
        if (cat) {
            replace.push(`cat=${cat}`)
        }
        if (state) {
            replace.push(`state=${state}`)
        }

        nav(`/adlist?${replace.join('&')}`, { replace: true })

    }, [q, cat, state]);

    let changeCat = (e) => {
        if(e != cat){
            setCat(e)
        }
    }




    useEffect(() => {
        let getStates = async () => {
            let list = await api.getStates();
            setStateList(list)
        }
        getStates();

    }, []);
    useEffect(() => {

        let getCategories = async () => {
            let list = await api.getCategories();
            setCategoriesList(list)
        }
        getCategories();
    }, []);

    return (
        <div className="adlist-area">
            <PageContainer>
                <div className="adlist-container">
                    <div className='flex'>
                        <div className="adlist-left-side">
                            <form method="GET">
                                <input
                                    type='text'
                                    name="q"
                                    placeholder="Pesquise por Algo."
                                    value={q}
                                    onChange={e => setQ(e.target.value)} />

                                <select name="state" value={state} onChange={e => setState(e.target.value)}>
                                    <option></option>
                                    {stateList ?
                                        stateList.map((e, i) =>
                                            <option key={i} value={e._id} >{e.name}
                                            </option>)
                                        :
                                        null
                                    }
                                </select>

                                <ul>
                                    {categoriesList &&
                                        categoriesList.map((e, k) =>
                                            <li onClick={() => changeCat(e.slug)} key={k} className={e.slug === cat ? 'category-item cat-active' : 'category-item'}>
                                                <img src={e.img} alt={e.name} />
                                                <span>{e.name}</span>
                                            </li>
                                        )
                                    }
                                </ul>
                            </form>
                        </div>
                        <div className="adlist-right-side">

                        </div>
                    </div>

                </div>
            </PageContainer>
        </div>
    )
}

export default AdList