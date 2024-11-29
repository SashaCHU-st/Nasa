import React, { useState } from 'react';
import './Search.css';
import { useQuery } from 'react-query';
import Header from '../../components/header/Header';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ErrorModal from '../../components/error_component/ErrorModal';
import Card from '../../components/card/Card';

const fetchNASAData = async (query) => {
  const url = `https://images-api.nasa.gov/search?q=${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result.collection.items.slice(0, 10); // Return first 10 results
};

const Search = () => {
  const [query, setQuery] = useState(''); // Stores user search input
  const [searchTriggered, setSearchTriggered] = useState(false); // Tracks whether a search has been initiated
  const [error, setError] = useState(null); // Error state for ErrorModal

  // Use react-query for fetching data
  const { data, isLoading, isError, refetch } = useQuery(
    ['nasaData', query],
    () => fetchNASAData(query),
    {
      enabled: false, // Prevent auto-fetching on load
    }
  );

  const fetchAPIData = () => {
    if (query.trim()) {
      setSearchTriggered(true); // Mark search as triggered
      refetch(); // Fetch data
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="searchWr">
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <div>
          {/* Header for search input and button */}
          <Header
            query={query}
            setQuery={setQuery}
            fetchAPIData={fetchAPIData}
          />

          {/* Error Modal */}
          <ErrorModal error={error} onClear={errorHandler} />

          {/* Render results only after search is triggered */}
          {searchTriggered && (
            <>
              {/* Show "no results" message if data is empty */}
              {data?.length === 0 && (
                <h1 className="no_found">Sorry, no results found.</h1>
              )}

              {/* Render results if data exists */}
              {data && data?.length > 0 && <Card data={data} />}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
