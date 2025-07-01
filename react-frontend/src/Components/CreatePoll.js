import React,{useState} from "react";
import "../Styles/create-poll.css"

const CreatePoll =()=>{
    const [formData,setFormData] = useState(
        {
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',

        });
        const handleChange =(e)=>{
            const {id,value} =e.target;
            setFormData(prev=>({
                ...prev,[id] :value
        }))
        };
        const handleSubmit= async()=>{
            const{question,option1,option2,option3,option4} = formData;
            if (
                !question.trim() ||
                !option1.trim() ||
                !option2.trim() ||
                !option3.trim() ||
                !option4.trim()
            ) {
                alert("please fill in the fields")
                return;
            }
            try {
                const response = await fetch("http://localhost:8001/polls/create", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(formData)
                });
                const data = await response.json();
                if(response.ok)
                {
                    alert(data.message)

                    setFormData({
                        question: '',
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: '',

                    });

                }
                else{
                    alert(data.error || "Failed to create poll");
                }
            }
            catch (err) {
                alert("An error occured while creating the poll");
            }
        };

        return (
  <div className="form-container">
    <h2>Create Poll</h2>
    <form>
        <label htmlFor="question" className="form-label">Question:</label>
        <input
        type="text"
        id="question"
        className="question-input"
        value={formData.question}
        onChange={handleChange}
        />
        <br />

        <label className="form-label">Options:</label>
        <div className="options-container">
          <input
            type="text"
            id="option1"
            className="option-input"
            value={formData.option1}
            onChange={handleChange}
          />
          <input
            type="text"
            id="option2"
            className="option-input"
            value={formData.option2}
            onChange={handleChange}
          />
          <input
            type="text"
            id="option3"
            className="option-input"
            value={formData.option3}
            onChange={handleChange}
          />
          <input
            type="text"
            id="option4"
            className="option-input"
            value={formData.option4}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="form-button"
          data-testid="create-poll-button"
          onClick={handleSubmit}
        >
          Create Poll
        </button>
    </form>
  </div>
        );
};
export default CreatePoll;