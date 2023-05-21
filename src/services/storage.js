export const storeUserData = (data) => {
    localStorage.setItem('idToken',data)
}
export const removeIdToken = () => {
    localStorage.removeItem('idToken');
}

export const getUserData = ()=>{
   return localStorage.getItem('idToken');
}