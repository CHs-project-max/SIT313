import React from "react";
import Card from "./Card";
import ArticleList from "./ArticleList";
import "./FeatureArticles.css"

function FeatureArticle() {
    return <div className="FeatureArticles">
    {ArticleList.map(  (article ) => 
      <Card 
    id = {article.key}
    src = {article.src}
    name = {article.name}
    description = {article.description}
    author={article.author}
    stars={article.stars}
  />
)}
</div>
  }
  
export default FeatureArticle;
