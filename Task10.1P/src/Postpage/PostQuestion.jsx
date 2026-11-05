import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import Form from "./Form";
import './postArticle.css'
import { addCollectionAndDocument } from "../utils/firebase";
import { supabase } from '../utils/supabase'; 
import { oneDark } from '@codemirror/theme-one-dark';
export default function PostQuestion() {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    tag: "",
    code: "",
    date: "",
    img: ""
  });

  const [imageFile, setImageFile] = useState(null);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
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
        alert('Failed to upload image.'); 
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
    try{
      await addCollectionAndDocument('questions', questionToAdd);
    }
    catch(e)
    {
      console.log(e.message)
    }
    setNewQuestion({ title: "", description: "", tag: "", code: "", date: "", img: "" });
    setImageFile(null);
  }

  return (
    <div className="post-question-container">
      <form onSubmit={handleAddQuestion}>
        <Form label="Title:" height="35px" display="flex" name='title' value={newQuestion.title} onChange={handleInputChange} placeholder="Enter a descriptive title"/>
        <Form label="Describe your problem:" height="120px" name='description' value={newQuestion.description} onChange={handleInputChange}/>
        <Form label="Tag:" height="35px" display="flex" name='tag' value={newQuestion.tag} onChange={handleInputChange} placeholder="Add up to 3 tags e.g., Java"/>

        <div>
          <label>Code (Markdown supported):</label>
          <CodeMirror
            value={newQuestion.code}
            height="200px"
            theme={oneDark}
            extensions={[markdown()]}
            onChange={(value) => setNewQuestion(prev => ({ ...prev, code: value }))}
          />
        </div>

        <div>
          <label>Preview:</label>
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>{newQuestion.code}</ReactMarkdown>
        </div>

        <button className="Post">Post</button>
      </form>
    </div>
  );
}
