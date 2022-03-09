import { useParams, Link } from 'react-router-dom'
import { PageContainer } from '../../components/MainComponents'
import FakeLoading from '../../components/partials/FakeLoading'
import './adpage.css'
import useApi from '../../helpers/OlxApi';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image'
import AdItem from '../../components/partials/AdItem'
import "react-slideshow-image/dist/styles.css";
import BreadChumb from '../../components/partials/BreadChumb';

const Page = () => {
    let api = useApi();
    let { id } = useParams();

    let [loading, setLoading] = useState(true)
    let [adInfo, setAdInfo] = useState({})


    useEffect(() => {
        const getInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json.adItem);
            setLoading(false)
        }
        getInfo(id);
    }, []);
    const formateDate = (d) => {
        let data = new Date(d);
        return `Criado em ${data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`;
    }

    return (
        <div className='PageAdAll'>
            <PageContainer>

                {adInfo.category &&
                    <BreadChumb>
                        Você está em:
                        <Link to='/'>Home</Link>
                        /
                        <Link to={`/ads?state=${adInfo.stateName.name}`}>{adInfo.stateName.name}</Link>
                        /
                        <Link to={`/ads?state=${adInfo.stateName.name}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                        / {adInfo.title}
                    </BreadChumb>
                }

                <div className='ad-Container'>
                    <div className='left-Side'>
                        <div className='box'>
                            <div className='ad-Image'>
                                {loading && <FakeLoading height={300} />}
                                {adInfo.images &&
                                    <Slide>
                                        {adInfo.images.map((imgs, i) =>
                                            <div key={i} className='each-image'>
                                                <img src={imgs} alt='' />
                                            </div>
                                        )}
                                    </Slide>
                                }
                            </div>
                            <div className='ad-Info'>
                                <div className='ad-Name'>
                                    {loading && <FakeLoading height={20} />}
                                    {adInfo.title &&
                                        <h2>{adInfo.title}</h2>
                                    }
                                    {adInfo.dateCreated &&
                                        <small>{formateDate(adInfo.dateCreated)}</small>
                                    }

                                </div>
                                <div className='ad-Description'>
                                    {loading && <FakeLoading height={80} />}
                                    {adInfo.description &&
                                        <p>{adInfo.description}</p>
                                    }
                                    <hr />
                                    {adInfo.views &&
                                        <small>Visualizações: {adInfo.views}</small>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-Side'>
                        <div className='box ad-pad'>
                            {loading && <FakeLoading height={20} />}
                            {adInfo.priceNegotiable &&
                                <p>Preço negociável</p>
                            }
                            {adInfo.price >= 0 && !adInfo.priceNegotiable&&
                                <p>Preço: <br /> <span className='price'>R$ {adInfo.price}</span></p>
                            }
                        </div>
                        {adInfo.userInfo &&
                            <div className='contact-box'>
                                <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className='contact'>Fale com vendedor</a>

                                <div className='box ad-pad'>
                                    {loading && <FakeLoading height={50} />}
                                    <div className='created-by'>
                                        <p><strong>{adInfo.userInfo.name}</strong></p>
                                        <p>Email: {adInfo.userInfo.email}</p>
                                        <p>Estado: {adInfo.stateName.name}</p>
                                    </div>
                                </div>

                            </div>
                        }

                    </div>
                </div>
                <div className='others-container'>
                    <div >
                        {adInfo.others &&
                            <>
                                <h2>outros anuncios</h2>
                                <div className='others-list'>
                                    {adInfo.others.slice(0, 4).map((e, i) =>
                                        <AdItem key={i} data={e} others={true} />
                                    )}

                                </div>

                            </>
                        }

                    </div>
                </div>
            </PageContainer>
        </div>
    )
}

export default Page