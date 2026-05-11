import {Link} from 'react-router-dom'

import propTypes from 'prop-types'
import './Movie.css'

const Movie = ({id, coverImg, title, summary, rating, genres}) => {
    return <article className="movie">
        <img src={coverImg} alt={title}/>
        <div>
            <span>Rating {rating}</span>
            <h2>
                <Link to={`/movies/${id}`}>{title}</Link>
            </h2>
            <p>{summary}</p>
            <ul>
                {genres.map((genre) => <li key={genre}>{genre}</li>)}
            </ul>
        </div>
    </article>
}

Movie.propTypes = {
    id: propTypes.number.isRequired,
    coverImg: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    summary: propTypes.string.isRequired,
    rating: propTypes.number.isRequired,
    genres: propTypes.arrayOf(propTypes.string).isRequired,
}

export default Movie
