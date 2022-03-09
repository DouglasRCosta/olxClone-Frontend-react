import './breadchumb.css'
let breadChumb = (props)=>{
    return(
        <div className="bread">
            {props.children}
        </div>
    )
}

export default breadChumb