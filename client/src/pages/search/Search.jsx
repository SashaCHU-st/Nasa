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

  // Сохраняем состояние запроса и данных
  const [inputValue, setInputValue] = useState(() => {
    return new URLSearchParams(location.search).get('q') || '';
  });
  const [query, setQuery] = useState(() => {
    return new URLSearchParams(location.search).get('q') || '';
  });
  const [searchTriggered, setSearchTriggered] = useState(!!query.trim());

  const { data, isLoading, isError, error } = useQuery(
    ['nasaData', query],
    () => fetchNASAData(query),
    {
      enabled: searchTriggered, // Запрос выполняется только если поиск активирован
      onSuccess: () => {
        // Обновляем состояние после успешного выполнения запроса
        setSearchTriggered(false);
      },
    }
  );

  // Синхронизация query и URL
  useEffect(() => {
    if (query.trim()) {
      navigate(`?q=${query}`, { replace: true });
    }
  }, [query, navigate]);

  const fetchAPIData = () => {
    if (inputValue.trim()) {
      setQuery(inputValue); // Обновляем query
      setSearchTriggered(true); // Запускаем поиск
    }
  };

  const errorHandler = () => {
    // Очистка ошибок (если понадобится)
  };

  return (
    <div className="searchWr">
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <div>
          <Header
            query={inputValue} // Передаем текущее значение поля
            setQuery={setInputValue} // Обновляем поле ввода
            fetchAPIData={fetchAPIData} // Выполняем поиск
          />
          {isError && <ErrorModal error={error.message} onClear={errorHandler} />}
          {data?.length === 0 && <h1 className="no_found">Sorry, no results found.</h1>}
          {data && data?.length > 0 && <Card data={data} />}
        </div>
      )}
    </div>
  );
};

export default Search;
