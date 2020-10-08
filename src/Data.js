import axios from "axios";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { debounce } from "./utils/debounce";
import { DataContext } from "./context/dataContext";
const APIKEY = process.env.REACT_APP_APIKEY;

const Data = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [movies2, setMovies2] = useState([])

  const { movies, updateMovies /*choice1, choice2*/ } = useContext(DataContext);
  console.log(movies);
  useEffect(() => {
    const fetchData = async (searchTerm) => {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: APIKEY,
          s: searchTerm,
        },
      });
      if (response.data.Error) return [];
      updateMovies(response.data.Search);
    };

    fetchData(searchTerm);

    const onMovieSelect = async (searchTerm2) => {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: APIKEY,
          i: searchTerm2,
        },
      }); if (response.data.Error) return [];
      setMovies2(response.data);
    };
    onMovieSelect(searchTerm2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchTerm2]);

  const renderMovies2 = () => {
    console.log(movies2)
  }

  console.log(movies2)

  const renderList = (selector = "Year") => {
    if (movies.length < 1) return;
    return movies.map((movie) => {
      return (
        <div
          key={movie.imdbID}
          style={{ display: "flex", justifyContent: "", textAlign: "left" }}
        >
          <div style={{ padding: "3px" }}>
            <p>
              <strong>Title:</strong> {movie.Title}
            </p>
          </div>
          <div style={{ padding: "3px" }}>
            <p>
              <strong>Year:</strong> {movie[selector]}
            </p>
          </div>
        </div>
      );
    });
  };

  const handleChange = (value) => {
    return setSearchTerm(value);
  };
  const handleChange2 = (value) => {
    return setSearchTerm2(value);
  };
  const debounceOnChange = useCallback(debounce(handleChange, 1000), []);
  const debounceOnChange2 = useCallback(debounce(handleChange2, 1000), []);


  return (
    <div>
      <h1>Movie List</h1>
      <div className="ui form" style={{ display: "flex" }}>
        <div style={{ padding: "5px" }}>
          <label>Search for movies </label>
          <input
            onChange={(e) => debounceOnChange(e.target.value)}
            style={{ maxWidth: "40vw" }}
          />
        </div>
        <div style={{ padding: "5px" }}>
          <label>What do you want to be quizzed on? </label>
          <input
          placeholder="not yet!"
            onChange={(e) => debounceOnChange2(e.target.value)}
            style={{ maxWidth: "40vw" }}
          />{" "}
        </div>
      </div>
      {renderList()}
      <div style={{ margin: "1rem" }}>
        <p>Use this data?</p>
        <div
          className="ui basic button teal"
          onClick={() => {
            history.push("/review");
          }}
        >
          Go to Quiz
        </div>
      </div>
    </div>
  );
};

export default Data;

/*


//need to get info from input
  //need to debounce api call
  //use search term to get data
  //get a 20 item list
  //add buttons to choose list data to plug in quiz
tt0072890



{Title: "Dog Day Afternoon", Year: "1975", Rated: "R", Released: "25 Dec 1975", Runtime: "125 min", …}
Actors: "Penelope Allen, Sully Boyar, John Cazale, Beulah Garrick"
Awards: "Won 1 Oscar. Another 13 wins & 20 nominations."
BoxOffice: "N/A"
Country: "USA"
DVD: "N/A"
Director: "Sidney Lumet"
Genre: "Biography, Crime, Drama, Thriller"
Language: "English"
Metascore: "86"
Plot: "Three amateur bank robbers plan to hold up a bank. A nice simple robbery: Walk in, take the money, and run. Unfortunately, the supposedly uncomplicated heist suddenly becomes a bizarre nightmare as everything that could go wrong does."
Poster: "https://m.media-amazon.com/images/M/MV5BODExZmE2ZWItYTIzOC00MzI1LTgyNTktMDBhNmFhY2Y4OTQ3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
Production: "Artists Entertainment Complex"
Rated: "R"
Ratings: (3) [{…}, {…}, {…}]
Released: "25 Dec 1975"
Response: "True"
Runtime: "125 min"
Title: "Dog Day Afternoon"
Type: "movie"
Website: "N/A"
Writer: "Frank Pierson (screenplay), P.F. Kluge (based upon a magazine article by), Thomas Moore (based upon a magazine article by)"
Year: "1975"
imdbID: "tt0072890"
imdbRating: "8.0"
imdbVotes: "231,221"
*/
