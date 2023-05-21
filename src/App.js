import Navbar from "./components/navbar"

import Centerimage from "./components/centerimage"
import Maincard from "./components/maincard";
import './App.css';
import { logout } from "./services/Auth";
//logout function

function App() {
const logOut = () => {
  logout();
  //navigate to login page
  window.location.href = "/";

};

  return (
    <div>
      <Navbar logout={logOut}/>
      <Centerimage/>
      <Maincard/>
    </div>
    
  );
}

export default App;
