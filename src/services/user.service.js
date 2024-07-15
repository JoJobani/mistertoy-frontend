import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

//For debugging
window.us = userService

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    const savedUser = httpService.post(BASE_URL + 'signup', user)
    if (savedUser) return _setLoggedinUser(savedUser)
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGIN))
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
    return user
}