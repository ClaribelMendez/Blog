import './App.css';
// import Blog from './components/blogposts';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Post from './components/post' 
import Form from './components/form'
import Genres from './components/genres'
import Home from './components/home'
import { useState, useEffect } from 'react';
import { accessToken } from './components/spotify';






function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);


 

//   if (refreshToken) {
//     fetch(`/refresh_token?refresh_token=${refreshToken}`)
//       .then(res => res.json())
//       .then(data => console.log(data))
//       .catch(err => console.error(err));
//   }
// }, []);
  return (
    <div>
    <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </a>
        ) : (
          <h1>Logged in!</h1>
        )}
      </header>
    <Genres />
    </div>
   
     )
}

export default App;



