import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import './FindQuestions.css';
import ReactMarkdown from "react-markdown";

export default function FindQuestions() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState({ title: "", tag: "", date: "" });
  const [expandedId, setExpandedId] = useState(null);
  const [hiddenQuestions, setHiddenQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const q = collection(db, "questions");
      const snapshot = await getDocs(q);
      const allQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(allQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  const filteredQuestions = questions
    .filter(q => !hiddenQuestions.includes(q.id)) 
    .filter(q => {
      const titleMatch = q.title.toLowerCase().includes(filter.title.toLowerCase());
      const tagMatch = filter.tag === "" || q.tag.toLowerCase().split(",").map(t => t.trim()).includes(filter.tag.toLowerCase().trim());
      const dateMatch = filter.date === "" || q.date === filter.date;
      return titleMatch && tagMatch && dateMatch;
    });

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  function handleHide(id) {
    setHiddenQuestions(prev => [...prev, id]);
  }

  return (
    <div className="find-questions-container">
      <h1>Find Questions</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Title"
          value={filter.title}
          onChange={e => setFilter({ ...filter, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Tag"
          value={filter.tag}
          onChange={e => setFilter({ ...filter, tag: e.target.value })}
        />
        <input
          type="date"
          value={filter.date}
          onChange={e => setFilter({ ...filter, date: e.target.value })}
        />
      </div>

      <div className="questions-list">
        {filteredQuestions.length === 0 && <p>No questions found.</p>}
        {filteredQuestions.map(q => (
          <div key={q.id} className="question-card">
            <div className="question-summary" onClick={() => toggleExpand(q.id)}>
              <h3>{q.title}</h3>
              <p><b>Tag:</b> {q.tag || "N/A"} | <b>Date:</b> {q.date || "N/A"}</p>
            </div>
            {expandedId === q.id && (
                <div className="question-details">
                <p>{q.description}</p>
            
                {q.code && (
                  <div className="question-code">
                    <h4>Code:</h4>
                    <div className="code-container">
                    <ReactMarkdown>{q.code}</ReactMarkdown>
                    </div>
                  </div>
                )}
            
                {q.img && (
                  <img src={q.img} alt={`Image for ${q.title}`} className="question-image" />
                )}
                <button onClick={() => handleHide(q.id)}>Hide</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
