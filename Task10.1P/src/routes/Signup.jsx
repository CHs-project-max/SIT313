import React, {useState} from "react";
import "./Signup.css"
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
export default function Signup(){
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        displayName:'',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: '',
    })
    const handleSubmit = async (event) => {
         event.preventDefault();
        if (contact.password !== contact.confirmpassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
      
        setErrorMessage('');
        try{
            const response = await createAuthUserWithEmailAndPassword(contact.email, contact.password)
            const user = response.user;
            await createUserDocFromAuth(user, {displayName: contact.displayName, Last_name : contact.lastName, premium: false})
            navigate('/Login');
        }
        catch(error){
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email is already in use. Please try logging in or use a different email.');
              }
        }
        console.log("Account created!", contact);
        console.log("submit clicked")
    };
      
    console.log(contact)
    
    
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
    <div className = "SignupContainer">
        <div className="SignupForm">
        <h2 className="SignupHeader">Create a DEV@Deakin Account</h2>
        <div className="Row">
            <h2>Name*</h2>
            <input name="displayName" className="SignupBox" type="text" onChange={handleChange} value={contact.displayName}/>
        </div>
        <div className="Row">
            <h2>Last Name*</h2>
            <input name="lastName" className="SignupBox" type="text" onChange={handleChange} value={contact.lastName}/>
        </div>
        <div className="Row">
            <h2>Email*</h2>
            <input name="email" className="SignupBox" type="text" onChange={handleChange} value={contact.email}/>
        </div>
        <div className="Row">
            <h2>Password*</h2>
            <input name="password" className="SignupBox" type="password" onChange={handleChange} value={contact.password}/>
        </div>
        <div className="Row">
            <h2>Confirm Passwords*</h2>
            <input name="confirmpassword" className="SignupBox" type="password" onChange={handleChange} value={contact.confirmpassword} />
        </div>
        {errorMessage && (<p className="ErrorText">{errorMessage}</p>)}
        <button className="Signupbtn" onClick={handleSubmit}>Create</button>
        </div>
    </div>
    );
}