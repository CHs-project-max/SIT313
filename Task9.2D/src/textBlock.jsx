import React from "react";
import './textBlock.css'
function TextBlock(props){
    return<div className="textBlock">
    <h2 className="textBlockHeader">{props.header}</h2>
    <h3 className="textBlockitem">{props.text1}</h3>
    <h3 className="textBlockitem">{props.text2}</h3>
    <h3 className="textBlockitem">{props.text3}</h3>
    <h3 className="textBlockitem">{props.text4}</h3>
    </div>
}

export default TextBlock