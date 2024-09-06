import './index.css'
import {AiFillStar} from 'react-icons/ai'

const DetailsCard = props => {
  const {viewdata} = props
  const imgurl = `https://image.tmdb.org/t/p/w500${viewdata.posterPath}`
  return (
    <div className="detail-main-con">
      <img src={imgurl} alt="img-detail" className="img-D" />
      <p className="overview">{viewdata.overview}</p>
      <div className="inner-con">
        <div>
          <span>
            <AiFillStar className="star" />
          </span>
          <span>
            {viewdata.voteAverage.toFixed(1)} ({viewdata.voteCount} votes)
          </span>
        </div>
        <p>{viewdata.runtime} min</p>
        <p>Release Date:{viewdata.releasedate}</p>
      </div>
    </div>
  )
}
export default DetailsCard
