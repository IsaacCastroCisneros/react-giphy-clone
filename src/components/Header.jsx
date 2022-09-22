import React from 'react'
import {useNavigate,Link} from 'react-router-dom'

export default function Header({setSearch}) 
{
  const navigate = useNavigate()

  function searchContent(e)
  {
    navigate(`/gif?q=${e.target.value}`)
  }

  return (
    <header>
      <Link to='/'>fdfd</Link>
      <nav>
        <input type="text" className='block bg-pink-50'
         onChange={searchContent}
        />
      </nav>
    </header>
  );
}
