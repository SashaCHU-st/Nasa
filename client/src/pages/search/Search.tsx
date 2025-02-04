import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';
import { useQuery } from 'react-query';
import Header from '../../components/header/Header';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ErrorModal from '../../components/error_component/ErrorModal';
import Card from '../../components/card/Card';


const fetchNASAData = async (query:string) => {
  const apiUrl = process.env.REACT_APP_NASA_API_URL; 
  const url = `${apiUrl}${query}`;
  const response = await fetch(url);/// fetching only adat from api
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result.collection.items.slice(0, 10); // Return the first 10 results
};

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

// save what was put before even if page updated
  const [inputValue, setInputValue] = useState(() => {
    return new URLSearchParams(location.search).get('q') || '';// for example will return "moon" in this case 
    // URLSearchParams allow to check the parametrer. location.search req from URL. http://...../?q=moon will return moon
    // In case I want to save q even aftaer page has been updated
  });
  const [query, setQuery] = useState(() => {
    return new URLSearchParams(location.search).get('q') || '';
  });
  const [searchTriggered, setSearchTriggered] = useState(!!query.trim());//if triggred then set to true, if not contain from spaces

  const { data, isLoading, isError, error } = useQuery(// async req, for example data from API
  /// returns data, isLoading, isError, error. "automized" req succh as  data, isLoading, isError, error,
  // cashing
  ///
    ['nasaData', query],// query changing =>req also will chenge
    () => fetchNASAData(query),// function to get data
    {
      enabled: searchTriggered, // req only if search active
      onSuccess: () => {
        // update after succes req
        setSearchTriggered(false);// chenge flag when req successed
      },
    }
  );

  // Sync query и URL
  useEffect(() => {
    if (query.trim()) {// delete spaces in query
      navigate(`?q=${query}`, { replace: true });// replace means that the old route
      // need to be replced by new, without create new history... will be fixed
    }
  }, [query, navigate]);//when this is chenging in terigger useEffect and it will do their job

  const fetchAPIData = () => {
    if (inputValue.trim()) {
      setQuery(inputValue); // update query
      setSearchTriggered(true); // set search
    }
  };


  return (
    <div className="searchWr">
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <div>
          <Header
            query={inputValue} 
            setQuery={setInputValue}
            fetchAPIData={fetchAPIData} 
          />
          {isError && <ErrorModal error={String(error)} onClear={()=>setErrorMessage("")}  />}{/*send thru props messge about error... will be updated*/}
          {data?.length === 0 && <h1 className="no_found">Sorry, no results found.</h1>}
          {data && data?.length > 0 && <Card data={data} />}
        </div>
      )}
    </div>
  );
};

export default Search;

