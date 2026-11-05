import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { signInAuthUserWithEmailAndPassword} from "../utils/firebase";
export default function Login(){
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
       try{
           const response = await signInAuthUserWithEmailAndPassword(contact.email, contact.password)
           console.log(response)
           setErrorMessage('');
           navigate('/');
       }
       catch(error){
           console.log("error in creating accoutn", error.message)
           if (error.code === 'auth/invalid-credential') {
            setErrorMessage('Invalid email or password.');
          } 
       }
   };

    const [contact, setContact] = useState({
        email: '',
        password: ''
    })
   
const handleChange = (event)=>{
    const {name, value} = event.target
    setContact ((preValue)=>{  
    return {
    ...preValue,
    [name]: value
    }
    })
}
    return(
    <div className="LoginBlock">
        <div className="LoginForm">
            <Link className="top-right" to="/Signup">Sign up</Link>
            <h2 className="Logintext">Your email</h2>
            <input name = "email" className="LoginBox" type="text" onChange={handleChange} value={contact.email}/>
            <h2 className="Logintext">Your password</h2>
            <input name = "password" className="LoginBox" type="password" onChange={handleChange} value={contact.password} />
            {errorMessage && <p className="ErrorText">{errorMessage}</p>}
            <button type="submit" className="Loginbtn" onClick={handleSubmit}>Login</button>
  </div>
</div>
    )
}