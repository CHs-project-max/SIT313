import React from "react";
import Form from "./Form";
import './postArticle.css'
export default function PostArticle()
{
    return(
        <div>
            <Form label = "Title:" height = "35px" display = "flex" placeholder = "Enter a descriptive title"/>
            <Form label = "Abstract:" height = "120px" placeholder = "Enter 1 paragraph abstract" />
            <Form label = "Article text:" height = "300px" placeholder = "Enter your article" />
            <Form label = "Tag:" height = "35px" display = "flex" placeholder = "Please add up to 3 tags to describe what your article is about e.g., Java"/>
            <button className="Post">Post</button>
        </div>
    )
}