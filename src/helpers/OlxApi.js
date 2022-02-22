import Cookies from "js-cookie";
import qs from 'qs'
const BASE = 'http://localhost:5000'
const fetchPost = async (endpoint, body) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    let res = await fetch(BASE+endpoint,{
           method:'POST',
           headers:{
               'Accept' :'application/json',
               'Content-Type':'application/json'
           },
           body: JSON.stringify(body)
       }
    )
    let json = await res.json();

    if(json.notAllowed){
        window.location.href = '/singin';
        return;
    }
    return json;
}
const fetchGet = async (endpoint, body=[]) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    let res = await fetch(`${BASE+endpoint}?${qs.stringify(body)}`)
    let json = await res.json();

    if(json.notAllowed){
        window.location.href = '/singin';
        return;
    }
    return json;
}
const OlxApi = {
    login: async (email, password) => {
        let json = await fetchPost(
            '/user/singin',
            { email: email, password: password }
        )

        return json;
    }
}

export default () => OlxApi;
