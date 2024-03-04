// import Cookies from 'js-cookie'

const TokenKey = 'crm_token'
const UserDataKey = 'crm_account_data'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getUserData() {
  const userJson = sessionStorage.getItem(UserDataKey)
  if (!userJson) {
    return undefined
  }

  return JSON.parse(userJson)
}

export function setUserData(userData) {
  return sessionStorage.setItem(UserDataKey, JSON.stringify(userData))
}

export function removeUserData() {
  return sessionStorage.removeItem(UserDataKey)
}
