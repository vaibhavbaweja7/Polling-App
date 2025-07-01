import React, { useEffect, useState } from 'react';
import '../Styles/view-result.css';

const ViewResult =()=>{
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8001/polls/fetch')
      .then(res => res.json())
      .then(data => setPoll(data))
      .catch(() => alert('Could not load poll results'));
  }, []);

  if (!poll) return <p>Loading results...</p>;

  const options = [1,2,3,4].map(i => `option${i}`);

  return (
    <div className="result-container">
      <h2>Poll Results</h2>
      <h3>{poll.question}</h3>
      {options.map(opt => (
        <div key={opt} className="option">
          <span className="option-name">{poll[opt]}</span>
          <span className="votes">{poll[opt + 'Votes']} votes</span>
          <span className="percentage">{poll[opt + 'Percentage']}%</span>
          <div className="progress-bar">
            <div
              className="filled-bar"
              style={{ width: `${poll[opt + 'Percentage']}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewResult;