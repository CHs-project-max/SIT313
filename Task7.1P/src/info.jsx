import React from "react";
import TextBlock from "./textBlock";
import './Info.css'
function Info(){
    return <div className="Info">
        <div className="ContactInfo">
            <TextBlock header='Explore' text1 = 'Home' text2 = 'Question' text3 = 'Articles' text4 = 'Tutorials' />
            <TextBlock header='Support' text1 = 'FAQs' text2 = 'Help' text3 = 'Contect Us' text4 = '' />
            <div className="contact">
                <h2>Stay connected</h2>
                <div className="SM">
                    <img src="Facebook.png" alt="Description"/>
                    <img src="Twitter.png" alt="Description"/>
                    <img src="Insta.png" alt="Description"/>
                </div>
            </div>
        </div>
        <div className="policy">
            <h2>DEV@Deakin</h2>
            <div className="policyDetail">
                <h3>Privacy Policy</h3>
                <h3>Terms</h3>
                <h3>Code of Conduct</h3>
            </div>
        </div>
    </div>
}

export default Info
