import {useEffect, useState} from 'react'

import Movie from '../components/Movie'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])

    const getMovies = async () => {
        const json = await (
            await fetch('https://yts.bz/api/v2/list_movies.json?sort_by=year&minimum_rating=9.0')
        ).json();

        return json.data.movies
    }

    useEffect(() => {
        getMovies().then((movies) => {
            setMovies(movies)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            {
                loading
                    ?
                    <h1>Loading...</h1>
                    :
                    <div>
                        {movies.map((movie) =>
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                coverImg={movie.medium_cover_image}
                                title={movie.title}
                                summary={movie.summary}
                                rating={movie.rating}
                                genres={movie.genres}
                            />
                        )}
                    </div>
            }
        </div>
    )
}

export default Home