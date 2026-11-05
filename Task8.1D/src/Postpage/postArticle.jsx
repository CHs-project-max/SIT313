import React, {useState} from "react";
import Form from "./Form";
import './postArticle.css'
import { addCollectionAndDocument } from "../utils/firebase";
import { supabase } from '../utils/supabase'; 
export default function PostArticle()
{
    const [imageFile, setImageFile] = useState(null);
    const [newArticle, setNewArticle] = useState({
            title: "",
            Abstract: "",
            description: "",
            tag: "",
            date: "",
            img: ""
          });
    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewArticle(prev => ({ ...prev, [name]: value }));
    }
    function handleFileChange(e) {
      if (e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
  }
    async function handleAddArticle(e) {
            e.preventDefault();
          
            let imageUrl = '';
          
            if (imageFile) {
              const filePath = `public/${imageFile.name}_${Date.now()}`;
          
              const { data, error } = await supabase.storage
                .from('Image')  
                .upload(filePath, imageFile, {
                  cacheControl: '3600',
                  upsert: false,
                });
          
              if (error) {
                console.error('Error uploading image:', error.message);
                alert('Failed to upload image. Please try again.');
                return; 
              }
          
              const { data: publicUrlData } = supabase.storage
                .from('Image')
                .getPublicUrl(filePath);
          
              imageUrl = publicUrlData.publicUrl;
            }
          
            const questionToAdd = {
              ...newArticle,
              img: imageUrl,
              date: new Date().toISOString().split('T')[0],
            };
          
            await addCollectionAndDocument('articles', questionToAdd);
          
            setNewArticle({
              title: "",
              Abstract: "",
              description: "",
              tag: "",
              date: "",
              img: ""
            });
            setImageFile(null);
          }
        function handleFileChange(e) {
        if (e.target.files[0]) {
          setImageFile(e.target.files[0]);
        }  
    }
    return(
        <div>
            <form onSubmit={handleAddArticle}>
            <div className="AddImage">
            <label htmlFor="imageUpload">Add an image:</label>
            <input id="imageUpload" type="file" accept="image/*" onChange={handleFileChange} />
            {imageFile && <p>Selected file: <strong>{imageFile.name}</strong></p>}
            </div>
            <Form label = "Title:" height = "35px" display = "flex" name = 'title' value = {newArticle.title} onChange ={handleInputChange} placeholder = "Enter a descriptive title"/>
            <Form label = "Abstract:" height = "120px" name = 'Abstract' value = {newArticle.Abstract} onChange ={handleInputChange} placeholder = "Enter 1 paragraph abstract" />
            <Form label = "Article text:" height = "300px" name = "description" value = {newArticle.description} onChange ={handleInputChange} placeholder = "Enter your article" />
            <Form label = "Tag:" height = "35px" display = "flex" name = 'tag' value ={newArticle.tag} onChange ={handleInputChange} placeholder = "Please add up to 3 tags to describe what your article is about e.g., Java"/>
            <button className="Post">Post</button>
            </form>
        </div>
    )
}