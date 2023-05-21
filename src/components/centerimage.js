import React from "react"
import "./centerimage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
export default function Centerimage(){
    return(
        <div className="back">
            <div className="backmain">
            <h1 className="heading">SeekOut the book that seeks out to you</h1>
            <p className="para">An ebook (short for electronic book), also known as an e-book or eBook</p>
            <div className="ebtn">
                <button id="Ebtn" href="#">explore</button>
            </div>
            </div>
            <div className="cover">
            </div>
            <div className="addDelete">
                <button className="addDeleteBtn1"><FontAwesomeIcon icon={faPlus} /> ADD BOOK</button>
            </div>
            
        </div>
    )
} 