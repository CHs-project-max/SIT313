
import './App.css';
import './routes/Homepage'
import Homepage from './routes/Homepage';
import Login from './routes/Login';
import {Routes, Route} from 'react-router-dom'
import Signup from './routes/Signup';
import Post from './Post';
import FindQuestions from './FindQuestionPage/FindQuestion';
function App() {
  return (
    <div>
      <Routes>
        <Route path= '/' element ={<Homepage />}></Route>
          <Route path = 'Login' element = {<Login />}></Route>
          <Route path='Signup' element = {<Signup />}></Route>
          <Route path='POST' element = {<Post />}></Route>
          <Route path='FindQuestion' element= {<FindQuestions />}></Route>
      </Routes>
    </div>
  );
}

export default App;