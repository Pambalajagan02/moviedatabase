import {Component} from 'react'
import ReactDOM from 'react-dom'
import MovieCard from '../MovieCard'
import Header from '../Header'

import ViewCast from '../ViewDetails'
import './index.css'

const upStatus = {
  intial: 'INTIAL',
  inprogress: 'Inprogress',
  failure: 'Failure',
  success: 'Success',
}
class UpcomingMovies extends Component {
  state = {upapi: upStatus.intial, updata: []}

  componentDidMount() {
    this.getPopularDetails()
  }

  getPopularDetails = async () => {
    this.setState({upapi: upStatus.inprogress})
    const API_KEY = '5cf63f111232a7c505e15b7bff5f2904'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
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

      this.setState({upapi: upStatus.success, updata: updatedData})
    } catch (error) {
      console.log(error.message)
    }
  }

  onClikUcoming = id => {
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

  renderHomeView = () => {
    const {upapi} = this.state
    switch (upapi) {
      case upStatus.inprogress:
        return this.renderLoaderInHome()
      case upStatus.failure:
        return this.renderFailureInHome()
      case upStatus.success:
        return this.renderSuccessInHome()
      default:
        return null
    }
  }

  renderLoaderInHome = () => <div>Loading.....</div>

  renderSuccessInHome = () => {
    const {updata} = this.state
    return (
      <>
        <Header />
        <h1 className="movie-type-hed">Upcoming</h1>
        <ul className="ul-Movie">
          {updata.map(each => (
            <MovieCard
              key={each.id}
              movieItem={each}
              onClickDetails={this.onClikUcoming}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return <div>{this.renderHomeView()}</div>
  }
}
export default UpcomingMovies
