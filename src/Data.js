import axios from "axios";
import React, { useEffect, useContext } from "react";
//import { debounce } from "./utils/debounce";

import { DataContext } from "./context/dataContext";
const APIKEY = process.env.REACT_APP_APIKEY;

const Data = () => {
  //const [searchTerm, setSearchTerm] = useState("");
  const { movies, updateMovies /*choice1, choice2*/ } = useContext(DataContext);

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
    fetchData("dog");
    /*const onMovieSelect = async (movie) => {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: APIKEY,
          i: movie.imdbID,
        },
      });
    };
const testMovieInfo = onMovieSelect(testMovie)
console.log(testMovieInfo)*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderList = () => {
    if (movies.length < 1) return;
    console.log(movies);
    return movies.map((movie) => {
      return (
        <div key={movie.imdbID}>
          {movie.Title}, {movie.Year}
        </div>
      );
    });
  };
  //need to get info from input
  //need to debounce api call
  //use search term to get data
  //get a 20 item list
  //add buttons to choose list data to plug in quiz

  return (
    <div>
      <h1>Movie List</h1>
      <input />
      {renderList()}
      <div style={{ margin: "1rem" }}>
        <p>Use this data for quiz?</p>
      </div>
    </div>
  );
};

export default Data;

/*
      <Review data={movies}/>
send data to Review component
*/
