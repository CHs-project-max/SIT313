import React from "react";
import './Header.css'
export default function Header({selectType, onChange})
{
    return(
        <div>
            <h2 className="Text">New Post</h2>
            <div className="PostOption">
                <p className="selectPost">Select Post Type:</p>
                <label>
                    <input type="radio" checked = {selectType === 'question'} name = 'radiobutton' value = "question"
                    onChange={(e) => onChange(e.target.value)}/>Question
                </label>

                <label >
                    <input type="radio" checked = {selectType === 'article'} name = 'radiobutton' value = 'article'
                    onChange={(e) => onChange(e.target.value)}/>Article
                <span class="checkmark"></span>
                </label>
            </div>
            <h2 className="Text">What do you want to ask or share</h2>
        </div>
    )
}
