import React from 'react'
import './Header.css'
const Header = ({fetchAPIData, query,setQuery}) => {
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        fetchAPIData();
    }
  return (
    <div className='header'>
        <h1>Search</h1>
        <div className='input'>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
  )
}

export default Header
