
import './App.css';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import voteImg from "./Assets/vote.jpg";
import CreatePoll from "./Components/CreatePoll";
import RegisterVote from "./Components/RegisterVote";
import ViewResult from "./Components/ViewResult";

function App() {
  return (
    <BrowserRouter>
    <header className='header'>
      <img src={voteImg} alt="Logo" className= "Logo" />
      <h1 className='header-title'>Public Poll</h1>
      <nav className= "nav">
        <Link to="/">Create Poll</Link>
        <Link to ="/register-vote"> Register Vote</Link>
        <Link to="/view-result">View Result</Link>

      </nav>
          </header>

          <main className='container'>
            <Routes>
              <Route path= "/" element={<CreatePoll/>} />
              <Route path= "/register-vote" element={<RegisterVote/>} />
              <Route path= "/view-result" element={<ViewResult/>} />

            </Routes>
          </main>
    </BrowserRouter>
   
  );
}

export default App;
