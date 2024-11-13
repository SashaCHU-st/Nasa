import React from 'react'

const Header = ({fetchAPIData, query,setQuery}) => {
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        fetchAPIData();
    }
  return (
    <div>
        <h1>Search </h1>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                />
                <button type='Submit'> Search</button>
            </form>
        </div>
    </div>
  )
}

export default Header
