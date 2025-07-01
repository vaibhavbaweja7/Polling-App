import  React, {useEffect,useState} from  "react";
import "../Styles/register-vote.css";

const RegisterVote =()=>{
    const [poll,setPoll] = useState(null);
    useEffect(()=>{
        fetchPoll();
    },[]);

    const fetchPoll = async () => {
  try {
    const response = await fetch("http://localhost:8001/polls/fetch"); // ✅ use fetch()
    const data = await response.json(); // ✅ this works on the result of fetch()

    if (response.ok) {
      setPoll(data); // ✅ update state
    } else {
      alert(data.error || "Failed to fetch poll");
    }
  } catch (err) {
    alert("An error occurred while fetching poll");
  }
};
     const registerVote = async (optionId) => {
    try {
      const response = await fetch("http://localhost:8001/polls/updateVotes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ selectedOption: optionId })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchPoll(); // Refresh poll after voting
      } else {
        alert(data.error || "Failed to register vote");
      }
    } catch (err) {
      alert("An error occurred while registering your vote");
    }
};
 return (
    <div className="poll-container">
      <h2>Leave your Response</h2>
      {poll ? (
        <div>
          <h3 className="poll-question" data-testid="question-text">
            {poll.question}
          </h3>

          <div className="options-container">
            <button
              className="option-button"
              id="option1"
              onClick={() => registerVote("option1")}
            >
              {poll.option1}
            </button>
            <button
              className="option-button"
              id="option2"
              onClick={() => registerVote("option2")}
            >
              {poll.option2}
            </button>
            <button
              className="option-button"
              id="option3"
              onClick={() => registerVote("option3")}
            >
              {poll.option3}
            </button>
            <button
              className="option-button"
              id="option4"
              onClick={() => registerVote("option4")}
            >
              {poll.option4}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading poll...</p>
      )}
    </div>
  );

};
export default RegisterVote;