import React from "react";
import Card from "./Card";
import TutorialList from "./TutorialList";
import './FeatureArticles.css'
function FeatureTutorials() {
    return <div className="FeatureArticles">
    {TutorialList.map(  (Tutorial ) => 
      <Card 
    id = {Tutorial.key}
    src = {Tutorial.src}
    name = {Tutorial.name}
    description = {Tutorial.description}
    author={Tutorial.author}
    stars={Tutorial.stars}
  />
)}
</div>
}
  
export default FeatureTutorials;
