import './App.css';
import Homepage from './routes/Homepage';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Post from './Post';
import FindQuestions from './FindQuestionPage/FindQuestion';
import PricingPage from './routes/PricingPage';

import { Routes, Route } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {useEffect} from 'react';

const stripePromise = loadStripe("pk_test_51SBTIxQREaGR5hlFY4OjsuodT1Bqh5MpyUmj4GwPINuAk3VqGBvU4yhOLvJmXw3fuKc6fk3SRcAe7UuJkC1ISxTw00R5wpSzcE");

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  
  return (
    <Elements stripe={stripePromise}>
      <div>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='post' element={<Post />} />
          <Route path='findquestion' element={<FindQuestions />} />
          <Route path='Plan' element={<PricingPage />} /> 
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
