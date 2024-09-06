import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-con">
    <div className="div-nav-con">
      <h1 className="hed-nav">movieDB</h1>
      <ul className="nav-ul-container">
        <li className="lit">
          <Link to="/">
            <button type="button" className="button-nav" data-testid="Popular">
              Popular
            </button>
          </Link>
        </li>
        <li className="lit">
          <Link to="/top-rated">
            <button type="button" className="button-nav" data-testid="TopRated">
              TopRated
            </button>
          </Link>
        </li>
        <li className="lit">
          <Link to="/upcoming">
            <button type="button" className="button-nav" data-testid="UpComing">
              UpComing
            </button>
          </Link>
        </li>
        <li className="lit">
          <input
            type="search"
            placeholder="Enter for Search"
            className="inputstyle"
          />
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
