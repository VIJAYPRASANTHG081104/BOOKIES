import React from "react"
import logo from "./images/read.png"
import "./navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse,faUser,faCheck} from '@fortawesome/free-solid-svg-icons'

export default function Navbar(){
    return(
        <div className="navbar" id="navbar">
                <div>
                    <img className="logo" alt="logo" src={logo}></img>
                </div>
                <ul className="navlinks">
                    <li className="links"><FontAwesomeIcon icon={faHouse}/> Home</li>
                    <li  id="loginBTN"><FontAwesomeIcon icon={faUser} /> LOG OUT</li>
                    <li  id="loginBTN"><FontAwesomeIcon icon={faCheck} /> create account</li>
                </ul>
        </div>
    )
}
function changeBg(){
    var navbar = document.getElementById("navbar");
    var scrollvalue = window.scrollY;
    if(scrollvalue < 150){
        console.log("lp");
        navbar.classList.add('navbar');
        navbar.classList.remove('navbar2');
    }
    else{
        navbar.classList.add("navbar2");
        navbar.classList.remove("navbar");
    }
}
window.addEventListener('scroll',changeBg)