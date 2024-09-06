import {Component} from 'react'
import ReactDOM from 'react-dom'
import MovieCard from '../MovieCard'
import ViewCast from '../ViewDetails'
import Header from '../Header'
import './index.css'

const topStatus = {
  intial: 'INTIAL',
  inprogress: 'Inprogress',
  failure: 'Failure',
  success: 'Success',
}
class TopRated extends Component {
  state = {topapi: topStatus.intial, topdata: []}

  componentDidMount() {
    this.getPopularDetails()
  }

  getPopularDetails = async () => {
    this.setState({topapi: topStatus.inprogress})
    const API_KEY = '5cf63f111232a7c505e15b7bff5f2904'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originaLanguage: each.original_language,
        originalTitle: each.original_title,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))

      this.setState({topapi: topStatus.success, topdata: updatedData})
    } catch (error) {
      console.log(error.message)
    }
  }

  onClikTopView = id => {
    const newWindow = window.open('', '_blank')

    // Ensure the new tab has finished loading
    newWindow.document.write('<div id="root"></div>')
    newWindow.document.title = 'Details Page'

    const styles = document.querySelectorAll('style, link[rel="stylesheet"]')
    styles.forEach(style => {
      newWindow.document.head.appendChild(style.cloneNode(true))
    })

    // Render the component into the new tab
    ReactDOM.render(
      <ViewCast movieid={id} />,
      newWindow.document.getElementById('root'),
    )
  }

  renderTopView = () => {
    const {topapi} = this.state
    switch (topapi) {
      case topStatus.inprogress:
        return this.renderLoaderInTop()
      case topStatus.failure:
        return this.renderFailureInTop()
      case topStatus.success:
        return this.renderSuccessInTOP()
      default:
        return null
    }
  }

  renderLoaderInTop = () => <div>Loading.....</div>

  renderSuccessInTOP = () => {
    const {topdata} = this.state
    return (
      <>
        <Header />
        <h1 className="movie-type-hed">Top Rated</h1>
        <ul className="ul-Movie">
          {topdata.map(each => (
            <MovieCard
              key={each.id}
              movieItem={each}
              onClickDetails={this.onClikTopView}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return <div>{this.renderTopView()}</div>
  }
}
export default TopRated
