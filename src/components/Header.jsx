import React from 'react'
import {useNavigate,Link} from 'react-router-dom'

export default function Header({setSearch}) 
{
  const navigate = useNavigate()

  function searchContent(e)
  {
    e.preventDefault()
    console.log(e.target)
    const value = e.target.querySelector('.searchInput').value
    navigate(`/search/${value}`)
  }

  return (
    <header>
      <Link to="/">fdfd</Link>
      <Link to="/no">yo</Link>
      <nav>
        <form onSubmit={searchContent}>
          <input
            type="text"
            className="searchInput block bg-pink-50"
          />
        </form>
      </nav>
    </header>
  );
}
