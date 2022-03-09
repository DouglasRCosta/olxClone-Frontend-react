import { Link } from "react-router-dom"

import './aditem.css'
const Aditem = (props) => {
    let price = '';

    (props.data.priceneg) ? price = 'Preço negociável' : price = `R$ ${props.data.price}`;
    let handleClick = () => {
        if (props.others) {
            window.location.href = `/ad/${props.data.id}`;
        }
    }
    return (
        <div className="ad-Item" >
            <Link to={`/ad/${props.data.id}`} onClick={handleClick}>
                <div className="item-Image">
                    <img src={props.data.image} />
                </div>
                <div className="item-Name">{props.data.title}</div>
                <div className="item-Price">{price}</div>
            </Link>
        </div>
    )
}

export default Aditem