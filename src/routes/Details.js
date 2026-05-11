import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const Detail = () => {
    const params = useParams()

    const [movie, setMovie] = useState({})

    const getDetail = async () => {
        const json = await (
            await fetch(`https://yts.bz/api/v2/movie_details.json?movie_id=${params.id}`)
        ).json();

        return json.data.movie
    }

    useEffect(() => {
        getDetail()
            .then((movie) => {
                setMovie(movie)
            })
    }, [])

    return <h1>Detail</h1>
}

export default Detail