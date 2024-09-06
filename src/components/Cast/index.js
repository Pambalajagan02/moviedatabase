import './index.css'

const Cast = props => {
  const {cast} = props
  const profileurl = `https://image.tmdb.org/t/p/w500${cast.profile}`
  return (
    <li className="list-style-cast">
      <img src={profileurl} alt="profile" className="img-profile" />
      <div>
        <p className="name-para">{cast.name}</p>
        <p className="name-para">{cast.character}</p>
      </div>
    </li>
  )
}
export default Cast
