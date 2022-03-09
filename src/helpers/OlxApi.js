import Cookies from "js-cookie";
import qs from 'qs'
const BASE = 'http://localhost:5000'

const fetchPost = async (endpoint, body) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token && token !== undefined) {
            body.token = token;
        }
    }
    let json = {};
    try {
        let res = await fetch(BASE + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        )
        json = await res.json();

        if (json.notAllowed) {
            window.location.href = '/singin';
            return;
        }
        return json;
    } catch (error) {
        json.error = "Sem Resposta";

        return json;
    }
}
const fetchPostAd = async (endpoint, body) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token && token !== undefined) {
            body.append('token',token);
        }
    }
    let json = {};
    try {
        let res = await fetch(BASE + endpoint, {
            method: 'POST',
            body
        }
        )
        json = await res.json();

        if (json.notAllowed) {
            window.location.href = '/singin';
            return;
        }
        
        return json;
    } catch (error) {
        json.error = "Sem Resposta";

        return json;
    }
}
const fetchGet = async (endpoint, body = []) => {
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    let json = {};
    try {
        let res = await fetch(`${BASE + endpoint}?${qs.stringify(body)}`)
        json = await res.json();

        if (json.notAllowed) {
            window.location.href = '/singin';
            return;
        }
        return json;
    } catch (error) {
        json.error = "Sem Resposta";
        return json;
    }

}
const OlxApi = {
    login: async (email, password) => {
        let json = await fetchPost(
            '/user/singin',
            { email: email, password: password }
        )
        return json;
    },
    register: async (name, email, password, state) => {
        let json = await fetchPost(
            '/user/singup',
            { name: name, email: email, password: password, state: state }
        )
        return json;
    },

    getStates: async () => {
        let json = await fetchGet('/states');
        return json.states
    },
    getCategories: async () => {
        let json = await fetchGet('/categories');
        return json.category
    },
    getAds: async (option) => {
        let json = await fetchGet('/ad/list',
            option);
        return json
    },
    getAd: async (id, other = false) => {
        let json = await fetchGet('/ad/item',
            { id, other });
        return json;
    },
    postAd: async (formDatas)=>{
  
        let json = await fetchPostAd('/ad/add',
       formDatas)

        return json;
    }
}

const Return = () => {
    return OlxApi;
}
export default Return;
