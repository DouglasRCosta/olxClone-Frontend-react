import './MainComponents.css'
export const Template=(props)=>{
    return(
        <div className="template">
            {props.children}
        </div>
    )
}
export const PageContainer=(props)=>{
    return(
        <div className="container">
            {props.children}
        </div>
    )
}
