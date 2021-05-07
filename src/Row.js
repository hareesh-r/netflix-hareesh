import axios from './axios';
import React, {useState,useEffect} from 'react'
import "./Row.css";

function Row( { title, fetchURL,isLarger } ) {

    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movies , setMovies] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchURL]);

    return (
        <div className="row">
            <h2> { title } </h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img
                        key={movie.id} className={`row__poster ${isLarger && "row__posterLarger"}`} src={`${base_url}${isLarger ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Row
