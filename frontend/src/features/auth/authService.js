import axios from 'axios'

const API_URL = '/api/users/'

//todo: register authservice
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}
//todo: login authservice
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//todo: logout authservice
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,login,logout
}

export default authService