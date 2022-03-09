import { useEffect, useRef, useState } from 'react';
import './postad.css'

import useApi from '../../helpers/OlxApi'
import { PageContainer } from '../../components/MainComponents';
import { useNavigate } from 'react-router-dom';



const Page = () => {
    const api = useApi()

    let files = useRef();
    let nav = useNavigate();

    let [title, setTitle] = useState('')
    let [category, setCategory] = useState('')
    let [price, setPrice] = useState('')
    let [priceNeg, setPriceNeg] = useState(false)
    let [desc, setDesc] = useState('')

    let [listCategories, setListCategories] = useState([])

    let [disabled, setDisabled] = useState(false);
    let [error, setError] = useState('');


    useEffect(() => {

        try {
            let getCat = async () => {
                let json = await api.getCategories();
                setListCategories(json);
            }
            getCat();
        } catch (error) {

        }


    }, [])

    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        setDisabled(true);

        let formDatas = new FormData();

        if (title && category && (price || priceNeg)) {
            formDatas.append('title', title);
            formDatas.append('cat', category);
            formDatas.append('desc', desc);
            formDatas.append('price', price);
            formDatas.append('priceneg', priceNeg);

            if (files.current.files.length > 0) {
                for (let i = 0; i < files.current.files.length; i++) {
                    formDatas.append('img', files.current.files[i]);
                }
            }



            let json = await api.postAd(formDatas);

            if (!json.error) {

                ///history

                nav(`/ad/${json.id}`);
            }
        }




        setTimeout(() => setDisabled(false), 900);

    }

    let changePrice = (e) => {
        if (parseFloat(e.target.value) <= 0) {
            console.log(parseFloat(e.target.value))
            setPrice(0)
        } else {
            setPrice(e.target.value)
        }
    }
    return (
        <PageContainer>
            <div className="signin-container">

                <h1 className='login-title'>Postar um anúncio</h1>
                {error && <h2 className='error'>{error}</h2>}

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Título:</div>
                        <div className="area-input">
                            <input type="text" disabled={disabled} value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Categoria:</div>
                        <div className="area-input">
                            <select name="cat" value={category} id="select-cat" onChange={e => setCategory(e.target.value)} required>
                                <option></option>
                                {listCategories ?
                                    listCategories.map((e, i) =>
                                        <option key={i} value={e._id} >{e.name}
                                        </option>)
                                    :
                                    null
                                }
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">preço:  R$</div>
                        <div className="area-input">
                            <input
                                type="number"
                                disabled={priceNeg}
                                value={price}
                                onChange={changePrice} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">preço Nogociável:</div>
                        <div className="area-input">
                            <input disabled={disabled} type='checkbox' checked={priceNeg} onChange={() => setPriceNeg(!priceNeg)} />

                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Descrição:</div>
                        <div className="area-input">
                            <textarea disabled={disabled} value={desc} onChange={e => setDesc(e.target.value)}>

                            </textarea>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Imagens:</div>
                        <div className="area-input">
                            <input disabled={disabled} type='file' multiple ref={files} onChange={() => setDesc(!priceNeg)} />

                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Postar</button>
                        </div>
                    </label>
                </form>
            </div>
        </PageContainer>

    );
}

export default Page;