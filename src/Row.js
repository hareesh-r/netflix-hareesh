import axios from './axios';
import React, {useState,useEffect} from 'react'
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";

function Row( { title, fetchURL,isLarger } ) {

    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movies , setMovies] = useState([]);

    const [trailerURL , setTrailerURL] = useState("");

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL("");
          } else {
            movieTrailer( movie?.name || "")
            .then((url)=>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerURL(urlParams.get('v'));
            })
            .catch((error)=>console.log(error));
          }
    }

    return (
        <div className="row">
            <h2> { title } </h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                        onClick={()=>handleClick(movie)}
                        key={movie.id} className={`row__poster ${isLarger && "row__posterLarger"}`} src={`${base_url}${isLarger ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                    ))
                }
            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts}/>}
        </div>
    )
}

export default Row