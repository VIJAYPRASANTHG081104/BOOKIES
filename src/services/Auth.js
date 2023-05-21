import { getUserData ,removeIdToken} from "./storage"
export const logout = ()=>{
    removeIdToken();
}
export const isAuthenticated = ()=>{
    return getUserData()!=null?true:false;
}