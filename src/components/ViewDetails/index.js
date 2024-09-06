import {Component} from 'react'
import DetailsCard from '../DetailsCard'
import Cast from '../Cast'
import './index.css'

const viewStatus = {
  intial: 'INTIAL',
  inprogress: 'Inprogress',
  failure: 'Failure',
  success: 'Success',
}

class ViewCast extends Component {
  state = {apiview: viewStatus.intial, viewdata: {}, castData: []}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiview: viewStatus.inprogress})
    const {movieid} = this.props
    const API_KEY = '5cf63f111232a7c505e15b7bff5f2904'
    const url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}&language=en-US`
    const casturl = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${API_KEY}&language=en-US`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const castresponse = await fetch(casturl)
      const castdata = await castresponse.json()
      const updatedDetails = {
        title: data.title,
        posterPath: data.poster_path,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
        runtime: data.runtime,
        genres: data.genres,
        releasedate: data.release_date,
        overview: data.overview,
      }
      const updatedCast = castdata.cast.map(each => ({
        id: each.id,
        profile: each.profile_path,
        name: each.original_name,
        character: each.character,
      }))
      console.log(updatedCast)

      this.setState({
        apiview: viewStatus.success,
        viewdata: updatedDetails,
        castData: updatedCast,
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  renderDetailView = () => {
    const {apiview} = this.state
    switch (apiview) {
      case viewStatus.inprogress:
        return this.renderLoaderInView()
      case viewStatus.failure:
        return this.renderFailureInView()
      case viewStatus.success:
        return this.renderSuccessInView()
      default:
        return null
    }
  }

  renderLoaderInView = () => (
    <>
      <h1>loading......</h1>
    </>
  )

  renderSuccessInView = () => {
    const {viewdata, castData} = this.state
    return (
      <>
        <div className="detailsCon">
          <DetailsCard viewdata={viewdata} />
        </div>
        <div className="Cast-Main-Con">
          <ul className="ul-cast">
            {castData.map(each => (
              <Cast key={each.id} cast={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    return <div>{this.renderDetailView()}</div>
  }
}
export default ViewCast
