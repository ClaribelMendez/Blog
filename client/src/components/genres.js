import { useState, useEffect } from "react";

// INCLUDE?


function Genres() {
  const [genres, setGenres] = useState([]);


  let handleGenreSelection = (e) => {
    setGenres(e.target.value)
  }
  const loadGenres = () => {
    fetch("http://localhost:4003/genres")
      .then((response) => response.json())
      .then((genre) => {
        setGenres(genre);
      });
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const getGenres =  (e) =>{
    e.preventDefault();
    let genre = e.target.value;
    console.log("Line 13 frontend ", genre);
    // add to request body
    fetch(`http://localhost:4003/game?genre=${genre}`, {
        method: "get",
        headers: {"Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
        // setCurrentGenre(data.response.currentGenre);
        console.log("Line 198 front" + data.response.genre);
        
    })
    .catch((err) => console.error(`Error: ${err}`));
}


  return (
    <div>
      {/* {currentTrack} */}
    <select onChange={getGenres}>
      <option value="⬇️ Select a genre ⬇️"> -- Select a genre -- </option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.value}>
          {genre.genre}
        </option>
      ))}
    </select>

    <a href='http://localhost:8888/login'>LOGIN WITH SPOTIFY</a>

    </div>
  );
}

export default Genres;