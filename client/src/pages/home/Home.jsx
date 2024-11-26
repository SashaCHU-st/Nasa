import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Card from '../../components/card/Card'

const Home = () => {
    const [query, setQuery] = useState("");//что будем искать
    const [data, setData] = useState(null);//хранение данных
    const [loading, setLoading] = useState(true);// если пока не загружена страница
    const fetchAPIData =async ()=>{// async функция позволяет выполянть код на фоне, то есть не блокирует остальные части программы
        const url = `https://images-api.nasa.gov/search?q=${query}`;/// url API адреса
        try {
            const response = await fetch(url);//await ждет когда fetch запрос будет выполнен
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); //ждет соответсвенно когда пройдет конвертация
            console.log('Data\n', result);
            if (result.collection && result.collection.items) {// если нашли
                setData(result.collection.items.slice(0, 5));
            } else
            {
                setData([])// если не нашли то пустой
            }
            setLoading(false);
        } catch (err) {
            console.log("Error:", err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAPIData();
    }, []);// если вставить query в [] то запрос будет постоянно отпаврляться например во время ввода будет искать совпадения сразу,
    // поэтому лучге оставить пустой, та как будет ждать например search кнопки

    return (
        <div className='searchWr'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Header
                       query={query}
                       setQuery={setQuery}
                       fetchAPIData={fetchAPIData} 
                    />
                    {/* {!data && <img src={home} className='homeI' alt="home" />}картинка в дефолт режиме */}
                    {/* {!data}картинка в дефолт режиме */}
                    {data?.length === 0 && <h1>Sorry no founds</h1> } {/* если искали но нечего не нашлось совпадающего, измеряем длину ?.length*/}
                    {data && data?.length > 0  && <Card data={data}/>} {/* все ок, выводим карту */}
                    <Card/>
                </div>
            )}
        </div>
    );
};

export default Home;
