/** */
import axios from 'axios'

//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadArticles () {
    return (dispatch) => {
        axios.get(`${url}articles`)
        .then((res) => {
            let articles = res.data
            dispatch({type:'LOAD_ARTICLES', articles})
        }).catch((err) => {
            console.log(err)
        })
    }
}
export function loadArticlesPersonal () {
    return (dispatch) => {
        axios.get(`${url}articles`)
        .then((res) => {
            let articles = res.data
            dispatch({type:'LOAD_ARTICLES', articles})
        }).catch((err) => {
            console.log(err)
        })
    }
}
export function getUser (_id) {
    return axios.get(`${url}user/${_id}`).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function getUserProfile (_id) {
    return (dispatch) => {
        axios.get(`${url}user/profile/${_id}`).then((res)=>{
            let profile = res.data
            dispatch({type: 'SET_PROFILE', profile})
        }).catch(err=>console.log(err))
    }
}

export function getArticle (article_id) {
    return (dispatch) => {
        axios.get(`${url}article/${article_id}`)
        .then((res) => {
            let article = res.data
            dispatch({type: 'VIEW_ARTICLE', article})
        }).catch((err) => console.log(err))
    }
}
export function deleteArticle (article_id,token) {
    return (dispatch) => {
        axios.post(`${url}delarticle/${article_id}/${token}`)
        .then((res) => {
            console.log(res.status)
            autoLogout(res.status)
            let article = res.data
            dispatch({type: 'VIEW_ARTICLE', article})
        }).catch((err) => autoLogout())
        window.location.reload()
    }
}
export function addSerie(id,article_id) {
    return (dispatch) => {
        axios.post(`${url}add-serie/${id}/${article_id}`)
        .then((res) => {
            //autoLogout(res.status)
            let article = res.data
            try {
                if(res.data.flag){
                    localStorage.clear()
                }
            } catch (error) {
                
            }
            dispatch({type: 'VIEW_ARTICLE', res})
        }).catch((err) => autoLogout())
    }
}
export function getSeries () {
    return (dispatch) => {
        axios.get(`${url}get-all`)
        .then((res) => {
            let series= res.data
            console.log(series)
            dispatch({type: 'LOAD_SERIES',series})
        }).catch((err) => autoLogout())
    }
}
export function updateArticle (article,token) {
    return (dispatch) => {
        axios.post(`${url}updatearticle/${article}/`)
        .then((res) => {
            //autoLogout(res.status)
            let _article = res.data
            console.log(res.data)
            dispatch({type: 'VIEW_ARTICLE', _article})
        }).catch((err) => autoLogout())
    }
}
// article_id, author_id, comment
export function comment () {
    return (dispatch) => {

    }
}
//req.body.article_id
export function clap (article_id) {
    return (dispatch) => {
        console.log('clapping...')
        axios.post(`${url}article/clap`,{ article_id }).then((res) => {
            dispatch({type:'CLAP_ARTICLE'})
        }).catch((err)=>console.log(err))
    }
}
//id, user_id
export function follow (id, user_id) {
    console.log(`${id} following ${user_id}`)
    return (dispatch) => {
        axios.post(`${url}user/follow`,{ id, user_id }).then((res) => {
            dispatch({type:'FOLLOW_USER', user_id})
        }).catch((err)=>console.log(err))        
    }
}

export function SignInUser (user_data) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user`,user_data).then((res)=>{
            let user = res.data
            console.log('==================signin=======')
            console.log(user)
            console.log('==================signin=======')
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_USER', user})
        }).catch((err)=>console.log(err))
    }
}
export function LoginUser (user_data) {
    return (dispatch) => {
        console.log('Login...')
        axios.post(`${url}login`,user_data).then((res)=>{
            let user = res.data
            console.log('==================Login=======')
            console.log(user)
            console.log('==================Login=======')
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_USER', user})
        }).catch((err)=>console.log(err))
    }
}
export function autoLogout(code){
    
        localStorage.clear();
        window.location.reload();
        return 1
}
export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})        
    }    
}
