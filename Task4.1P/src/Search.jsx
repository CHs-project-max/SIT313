import React from "react";
import './Search.css'
function Search(){
    return <div className="body">
        <h1 class = 'text'>DEV@Deakin</h1>
        <form className = "searchbox" action="/search" method="GET">
        <input type="text" className= "query" name="query" placeholder="🔍 Search" />
        </form>
        <div className="right button">
        <button type="button" className="btn-text">POST</button>
        <button type="button" className="btn-text">LOGIN</button>
        </div>
        </div>
}

export default Search