import React from "react";
import './Card.css'
function Card(props){
    return <div className="Card">
    <img src = {props.src} alt = "Article img"/>
    <h3>{props.name}</h3>
    <p>{props.description}</p>
    <div className="card-footer">
        <span> {props.stars} ⭐</span>
        <span>By: {props.author}</span>
    </div>
    </div>
}

export default Card