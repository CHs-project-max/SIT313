import React from "react";
import Form from "./Form";
import './postArticle.css'
export default function PostQuestion(){
    return(
        <div>
        <Form label = "Title:" height = "35px" display = "flex" placeholder = "Enter a descriptive title"/>
        <Form label = "Descibe your problem:" height = "120px" />
        <Form label = "Tag:" height = "35px" display = "flex" placeholder = "Please add up to 3 tags to describe what your question is about e.g., Java"/>
        <button className="Post">Post</button>
        </div>
    )
}