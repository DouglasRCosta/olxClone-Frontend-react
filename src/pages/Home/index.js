import React, { useEffect, useState } from "react";
import './home.css'
import { PageContainer } from "../../components/MainComponents";
import useApi from '../../helpers/OlxApi'
import { Link } from "react-router-dom";
import Aditem from "../../components/partials/AdItem";


const Page = () => {
    let api = useApi();
    let [stateList, setStateList] = useState([]);
    let [categoriesList, setCategoriesList] = useState([]);
    let [recentAds, setRecentAds] = useState([]);

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
        let getRecentAds = async () => {
            let json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setRecentAds(json.simpleAds)

        }
        getRecentAds();
    }, []);

    return (
        <>
            <div className="search-area">
                <PageContainer>
                    <div className="home-container">
                        <div className="search-box">
                            <form method="GET" action="/adlist">
                                <input type='text' name="q" placeholder="Pesquise por Algo." />
                                <select name="state">
                                    <option></option>
                                    {stateList ?
                                        stateList.map((e, i) =>
                                            <option key={i} value={e._id} >{e.name}
                                            </option>)
                                    :
                                    null      
                                    }
                                </select>
                                <button> Buscar</button>
                            </form>
                        </div>
                        <div className="category-list">
                            {categoriesList ?
                                categoriesList.map((e, i) =>
                                    <Link key={i} to={`/adlist?cat=${e.slug}`} className="category-item">
                                        <img src={e.img} alt={e.name} />
                                        <span>{e.name}</span>
                                    </Link>)
                                :
                                <p>err</p>
                            }

                        </div>
                    </div>
                </PageContainer>
            </div>

            <PageContainer>
                <div className="home-container">
                    <h2 className="recent-title">Recentes</h2>
                    <div className="recent-list">
                        {recentAds?
                            recentAds.map((e, i) =>
                                <Aditem key={i} data={e} />)
                         :
                         <p>err</p>       
                        }
                    </div>
                    <Link to='/ads' className="see-all-link">Ver Todos {">>"}</Link>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae lectus quis quam faucibus imperdiet non ut lectus. Donec vel arcu faucibus, pretium velit vel, feugiat nunc. Vestibulum malesuada gravida molestie. Integer vestibulum lectus ante, ut tempor odio malesuada sit amet. Integer dictum mi dui. Maecenas condimentum gravida suscipit. Sed sed mollis enim, at pharetra velit. Nulla facilisi. Suspendisse potenti. Fusce id risus tincidunt, gravida purus id, pharetra velit. Cras velit dolor, aliquam et dignissim et, cursus quis eros. Praesent placerat tellus et tellus dignissim, id sollicitudin velit viverra.
                    </p>
                </div>
            </PageContainer>

        </>


    )
}
export default Page
