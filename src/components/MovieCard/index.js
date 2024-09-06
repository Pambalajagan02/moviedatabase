import {AiFillStar} from 'react-icons/ai'
import './index.css'

const MovieCard = props => {
  const {movieItem, onClickDetails} = props
  console.log(movieItem)
  const imgurl = `https://image.tmdb.org/t/p/w500${movieItem.posterPath}`

  const onClickViewDetails = () => {
    onClickDetails(movieItem.id)
  }

  return (
    <li className="list-movie">
      <img src={imgurl} className="img-movie" alt={movieItem.title} />
      <div>
        <div>
          <span>
            <AiFillStar className="star" />
          </span>
          <span>
            {movieItem.voteAverage.toFixed(1)} ({movieItem.voteCount} votes)
          </span>
        </div>
        <h1 className="hed-movie">{movieItem.title}</h1>

        <button
          type="button"
          className="button-movie"
          onClick={onClickViewDetails}
        >
          View Details
        </button>
      </div>
    </li>
  )
}
export default MovieCard
