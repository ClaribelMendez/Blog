import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Genres from './components/genres'
import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './components/spotify';






function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch(e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);


 

//   if (refreshToken) {
//     fetch(`/refresh_token?refresh_token=${refreshToken}`)
//       .then(res => res.json())
//       .then(data => console.log(data))
//       .catch(err => console.error(err));
//   }
// }, []);
return (
  <div className="App">
    <header className="App-header">
    {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </a>
        ) : (
          <Router>
            <Routes>
              <Route path="/top-artists" element={'Top Artists'}>
                </Route>
              </Routes>
              <Routes>
              <Route path="/top-tracks" element={'Top Tracks'}>
              </Route>
              </Routes>
              <Routes>
              <Route path="/playlists/:id" element={'Playlists'}>
              </Route>
              </Routes>
              <Routes>
              <Route path="/" element ={<button onClick={logout}>Log Out</button>}>
              
                {/* <> */}
                  {/* <button onClick={logout}>Log Out</button> */}

                  {/* {profile && (
                    <div>
                      <h1>{profile.display_name}</h1>
                      <p>{profile.followers.total} Followers</p>
                      {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="Avatar"/>
                      )}
                    </div>
                  )} */}
                {/* </> */}
              </Route>
              </Routes>
          </Router>
        )}
    </header>
    <Genres />
  </div>
);
}

export default App;



