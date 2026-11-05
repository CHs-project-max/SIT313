import React from "react";
import './Form.css'
export default function Form(props){
    return(
        <div className="Form" style={ {display : props.display}}>
        <label className="text">{props.label}</label>
        <textarea className = "formBox" id="message" placeholder={props.placeholder} style={{height : props.height}}/>
        </div>
    )
}