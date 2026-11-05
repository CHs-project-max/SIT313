import React, {useState } from "react";
import Form from "./Form";
import './postArticle.css'
import { addCollectionAndDocument } from "../utils/firebase";
import { supabase } from '../utils/supabase'; 
export default function PostQuestion(){
    const [newQuestion, setNewQuestion] = useState({
        title: "",
        description: "",
        tag: "",
        date: "",
        img: ""
      });
    const [imageFile, setImageFile] = useState(null);
    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewQuestion(prev => ({ ...prev, [name]: value }));
      }    
    function handleFileChange(e) {
        if (e.target.files[0]) {
          setImageFile(e.target.files[0]);
        }
      }      
      
    async function handleAddQuestion(e) {
        e.preventDefault();
      
        let imageUrl = '';
      
        if (imageFile) {
          const filePath = `public/${imageFile.name}_${Date.now()}`;
      
          const { data, error } = await supabase.storage.from('Image').upload(filePath, imageFile, {
              cacheControl: '3600',
              upsert: false,
            });
      
          if (error) {
            console.error('Error uploading image:', error.message);
            alert('Failed to upload image. Please try again.');
            return;
          }
      
          const { data: publicUrlData } = supabase.storage.from('Image').getPublicUrl(filePath);
      
          imageUrl = publicUrlData.publicUrl;
        }
      
        const questionToAdd = {
          ...newQuestion,
          img: imageUrl,
          date: new Date().toISOString().split('T')[0],
        };
      
        await addCollectionAndDocument('questions', questionToAdd);
      
        setNewQuestion({
          title: "",
          description: "",
          tag: "",
          date: "",
          img: ""
        });
        setImageFile(null);
      }
    return(
        <div>
        <form onSubmit={handleAddQuestion}>
        <div className="AddImage">
            <label htmlFor="imageUpload">Add an image:</label>
            <input id="imageUpload" type="file" accept="image/*" onChange={handleFileChange} />
            {imageFile && <p>Selected file: <strong>{imageFile.name}</strong></p>}
        </div>
        <Form label = "Title:" height = "35px" display = "flex" name = 'title' value={newQuestion.title} onChange={handleInputChange} placeholder = "Enter a descriptive title"/>
        <Form label = "Descibe your problem:" height = "120px" name = 'description' value = {newQuestion.description} onChange={handleInputChange}/>
        <Form label = "Tag:" height = "35px" display = "flex" name = 'tag' value ={newQuestion.tag} onChange={handleInputChange} placeholder = "Please add up to 3 tags to describe what your question is about e.g., Java"/>
        <button className="Post">Post</button>
        </form>
        </div>
    )
}