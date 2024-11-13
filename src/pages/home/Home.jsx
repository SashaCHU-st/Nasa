import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card'
import home from '../../assets/home.svg'

const Home = () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchAPIData =async ()=>{
        const url = `https://images-api.nasa.gov/search?q=${query}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Data\n', result);
            if (result.collection && result.collection.items) {
                setData(result.collection.items.slice(0, 5));
            } else
                setData([])
            setLoading(false);
        } catch (err) {
            console.log("Error:", err.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAPIData();
    }, [query]);

    return (
        <div className='searchWr'>
            <h1>NASA Search Results for "{query}"</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Header
                       query={query}
                       setQuery={setQuery}
                       fetchAPIData={fetchAPIData} 
                    />
                    {!data && <img src={home} className='homeI' alt="home" />}
                    {data?.length === 0 && <h1>Sorry no founds</h1> }
                    {data && data?.length > 0  && <Card data={data}/>}
                    <Card/>
                </div>
            )}
        </div>
    );
};

export default Home;
