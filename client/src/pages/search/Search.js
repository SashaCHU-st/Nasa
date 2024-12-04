import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';
import { useQuery } from 'react-query';
import Header from '../../components/header/Header';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ErrorModal from '../../components/error_component/ErrorModal';
import Card from '../../components/card/Card';

const fetchNASAData = async (query) => {
  const apiUrl = process.env.REACT_APP_NASA_API_URL; 
  const url = `${apiUrl}${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result.collection.items.slice(0, 10); // Return the first 10 results
};

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || ''); // Initialize query from URL
  const [searchTriggered, setSearchTriggered] = useState(false); // Control whether search was triggered

  const { data, isLoading, isError, error } = useQuery(
    ['nasaData', query], 
    () => fetchNASAData(query),
    {
      enabled: searchTriggered, // Query only runs when search is triggered
    }
  );

  // Update query in URL when search is triggered
  useEffect(() => {
    if (query.trim()) {
      navigate(`?q=${query}`, { replace: true }); // Update URL with the query
    }
  }, [query, navigate]);

  const fetchAPIData = () => {
    if (query.trim()) {
      setSearchTriggered(true); // Trigger search
    }
  };

  const errorHandler = () => {
    // Clear any existing errors
  };

  return (
    <div className="searchWr">
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <div>
          <Header
            query={query}
            setQuery={setQuery}
            fetchAPIData={fetchAPIData} // Passing fetchAPIData to Header
          />
          {/* Show error modal if there's an error */}
          {isError && <ErrorModal error={error.message} onClear={errorHandler} />}
          {searchTriggered && (
            <>
              {data?.length === 0 && (
                <h1 className="no_found">Sorry, no results found.</h1>
              )}
              {data && data?.length > 0 && <Card data={data} />}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
