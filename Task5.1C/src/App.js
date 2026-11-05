import { useState } from 'react';
import Header from './Header'
import PostArticle from './postArticle';
import PostQuestion from './PostQuestion';

function App() {
  const [postType, setPostType] = useState(null);

  return (
    <div className="App">
      <Header selectType = {postType} onChange={setPostType} />
      {postType === 'article' && <PostArticle />}
      {postType === 'question' && <PostQuestion />}
    </div>
  );
}

export default App;
