import React, {useContext} from "react";
import './Search.css'
import { Link } from "react-router-dom";
import { AuthContext } from "./utils/AuthContext";
import { auth } from "./utils/firebase";
import { signOut } from "firebase/auth";
function Search(){
    const { user, setUser } = useContext(AuthContext);
    
    const handleSignOut = async () => {
        console.log(auth.currentUser);
        await signOut(auth);
        console.log(auth.currentUser);
        setUser(null);
    };
  
    return <div className="body">
        <h1 class = 'text'>DEV@Deakin</h1>
        <form className = "searchbox" action="/search" method="GET">
        <input type="text" className= "query" name="query" placeholder="🔍 Search" />
        </form>
        <div className="right button">
        <button type="button" className="btn-text">POST</button>

        {user ? (<Link to= "/"><button type="button" className="btn-text" onClick={handleSignOut} >LOG OUT</button></Link>) : 
        (<Link to= "Login"><button type="button" className="btn-text" >LOGIN</button></Link>)}
        </div>
        </div>
}

export default Search