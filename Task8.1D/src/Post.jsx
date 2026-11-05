import React from "react";
import { useState } from 'react';
import Header from './Postpage/Header'
import PostArticle from './Postpage/postArticle';
import PostQuestion from './Postpage/PostQuestion';
export default function Post() {
    const [postType, setPostType] = useState(null);

    return (
    <div>
      <Header selectType = {postType} onChange={setPostType} />
      {postType === 'article' && <PostArticle />}
      {postType === 'question' && <PostQuestion />}
    </div>
  );
}