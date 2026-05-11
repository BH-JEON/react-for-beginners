import {useCallback, useEffect, useState} from 'react'

import Movie from '../components/Movie'
import './Home.css'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [minimumRating, setMinimumRating] = useState(8.0)

    const getMovies = useCallback(async () => {
        const json = await (
            await fetch(`https://yts.bz/api/v2/list_movies.json?sort_by=year&minimum_rating=${minimumRating}`)
        ).json();

        return json.data.movies
    }, [minimumRating])

    const onChangeMinimumRating = (e) => {
        setMinimumRating(e.target.value)
    }

    useEffect(() => {
        setLoading(true);

        getMovies().then((movies) => {
            setMovies(movies)
            setLoading(false)
        })
    }, [getMovies])

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
                            <label>
                                Minimum rating
                                <select onChange={onChangeMinimumRating} value={minimumRating}>
                                    <option value="9">9.0+</option>
                                    <option value="8.5">8.5+</option>
                                    <option value="8">8.0+</option>
                                    <option value="7.5">7.5+</option>
                                    <option value="7">7.0+</option>
                                    <option value="6.5">6.5+</option>
                                    <option value="6">6.0+</option>
                                    <option value="5.5">5.5+</option>
                                    <option value="5">5.0+</option>
                                </select>
                            </label>
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
