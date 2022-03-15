import './adlist.css'
import { PageContainer } from '../../components/MainComponents';
import { useEffect, useState } from 'react';

import useApi from '../../helpers/OlxApi'
import { useLocation, useNavigate } from 'react-router-dom';
import Aditem from '../../components/partials/AdItem';


let timer;
const AdList = () => {
    let api = useApi();
    let nav = useNavigate();


    let useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQueryString();

    let [stateList, setStateList] = useState([]);
    let [categoriesList, setCategoriesList] = useState([]);
    let [ads, setAds] = useState([])


    let [adsTotal, setAdsTotal] = useState(0);
    let [pages, setPages] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);

    let [q, setQ] = useState((query.get('q')) != null ? query.get('q') : '')
    let [cat, setCat] = useState((query.get('cat')) != null ? query.get('cat') : '')
    let [state, setState] = useState((query.get('state')) != null ? query.get('state') : '')

    let [opacity, setOpacity] = useState(100);
    let [loading, setLoading] = useState(true);

    let getAds = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * 1
        let json = await api.getAds({
            sort: 'desc',
            limit: 1,
            offset,
            q,
            cat,
            state
        });
        setAds(json.simpleAds);
        setAdsTotal(json.total);
        setLoading(false);
    }
    useEffect(() => {
        setOpacity(40);
        let replace = [];
        if (q) {
            replace.push(`q=${q}`);
        }
        if (cat) {
            replace.push(`cat=${cat}`);
        }
        if (state) {
            replace.push(`state=${state}`);
        }
        if (currentPage) {
            replace.push(`page=${currentPage}`);
        }

        nav(`/adlist?${replace.join('&')}`, { replace: true });

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            getAds();
            setOpacity(100);
        }, 1500);

    }, [q, cat, state, currentPage]);

    let changeCat = (e) => {
        if (e !== cat) {
            setCat(e);

        }
        if (e === cat) {
            setCat('');
        }
        setCurrentPage(1)
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

    useEffect(() => {
        if (ads.length > 0) {
            setPages(Math.ceil(adsTotal / ads.length));
        } else {
            setPages(0);
        }
        setCurrentPage(1)
    }, [adsTotal])

    let pagination = []
    for (let i = 1; i <= pages; i++) {
        pagination.push(i)
    }
    let changePage = (e) => {
        if (e === currentPage) {
            return;
        } else if (e !== currentPage) {
            setCurrentPage(e);
        }

    }
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
                            <h2>Resultados</h2>

                            {loading &&
                                <h2 className='no-result'> Carregando !!</h2>
                            }
                            {(!loading && ads.length === 0) &&
                                <h2 className='no-result'>Nenhum resultado encontrado</h2>
                            }
                            <div className='ads' style={{ filter: `opacity(${opacity}%)` }}>

                                {ads &&
                                    ads.map((e, i) =>
                                        <Aditem key={i} data={e} />)
                                }

                            </div>
                            <div className='pagination'>
                                {currentPage > 1 &&
                                    <div
                                        className={"page-number"}
                                        onClick={() => changePage(currentPage - 1)}
                                    >
                                        {'<'}
                                    </div>
                                }
                                {pagination.map((e, i) => (

                                    (e === 1 || e === pages || (e >= currentPage - 3 && e <= currentPage + 3)) ?
                                        <div
                                            className={(e === currentPage) ? "page-number page-number-active" : "page-number"}
                                            key={i}
                                            onClick={() => changePage(e)}
                                        >
                                            {e}
                                        </div>
                                        :
                                        null
                                ))}
                                {currentPage < pages &&
                                
                                    <div
                                        className={"page-number"}
                                        onClick={() => changePage(currentPage + 1)}
                                    >
                                        {'>'}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </PageContainer>
        </div>
    )
}

export default AdList;