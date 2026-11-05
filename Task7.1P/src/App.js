
import './App.css';
import './routes/Homepage'
import Homepage from './routes/Homepage';
import Login from './routes/Login';
import {Routes, Route} from 'react-router-dom'
import Signup from './routes/Signup';
function App() {
  return (
    <div>
      <Routes>
        <Route path= '/' element ={<Homepage />}></Route>
          <Route path = 'Login' element = {<Login />}></Route>
          <Route path='Signup' element = {<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;