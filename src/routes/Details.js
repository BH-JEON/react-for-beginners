import {useEffect, useCallback, useState} from "react";
import {Link, useParams} from "react-router-dom";

import './Details.css'

const Detail = () => {
    const {id} = useParams()

    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState(null)

    const getDetail = useCallback(async () => {
        const json = await (
            await fetch(`https://yts.bz/api/v2/movie_details.json?movie_id=${id}`)
        ).json();

        return json.data.movie
    }, [id])

    useEffect(() => {
        getDetail()
            .then((movie) => {
                setMovie(movie)
                setLoading(false)
            })
    }, [getDetail])

    if (loading) {
        return (
            <main className="detail">
                <section aria-live="polite">
                    <div></div>
                    <h1>Loading movie...</h1>
                </section>
            </main>
        )
    }

    return (
        <main className="detail">
            <section>
                <img src={movie.large_cover_image} alt={movie.title}/>
                <div>
                    <Link to="/">Back to movies</Link>
                    <p>{movie.year} · {movie.runtime} min · {movie.language?.toUpperCase()}</p>
                    <h1>{movie.title_long}</h1>
                    <p>{movie.description_full}</p>
                    <ul>
                        {movie.genres?.map((genre) => <li key={genre}>{genre}</li>)}
                    </ul>
                </div>
            </section>

            <section>
                <article>
                    <span>Rating</span>
                    <strong>{movie.rating}</strong>
                </article>
                <article>
                    <span>Likes</span>
                    <strong>{movie.like_count}</strong>
                </article>
                <article>
                    <span>MPA</span>
                    <strong>{movie.mpa_rating || 'N/A'}</strong>
                </article>
                <article>
                    <span>IMDB</span>
                    <strong>{movie.imdb_code}</strong>
                </article>
            </section>

        </main>
    )
}

export default Detail
