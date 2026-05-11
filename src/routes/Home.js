import {useEffect, useState} from 'react'

import Movie from '../components/Movie'
import './Home.css'

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
        <main className="home">
            {
                loading
                    ?
                    <section aria-live="polite">
                        <div></div>
                        <h1>Loading movies...</h1>
                    </section>
                    :
                    <>
                        <section>
                            <p>Top rated movies</p>
                            <h1>Movies worth your next night in</h1>
                            <p>
                                Highly rated films sorted by release year, gathered into a clean
                                watchlist-style view.
                            </p>
                        </section>
                        <section aria-label="Movie list">
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
                        </section>
                    </>
            }
        </main>
    )
}

export default Home
