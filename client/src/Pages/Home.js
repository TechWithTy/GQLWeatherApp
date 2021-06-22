import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_WEATHER_QUERY } from '../graphql/Queries';

function Home() {
  const [citySearch, setCitySearch] = useState('');
  const [weatherInfo, setWeatherInfo] = useState({});

  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearch },
  });
  error && <h1>Error Found</h1>;
  data && console.log(data.getCityByName.weather.temperature.actual);
  useEffect(() => {
    if (data) {
      let cityName = data.getCityByName.name;
      let temperature = data.getCityByName.weather.temperature.actual;
      let summary = data.getCityByName.weather.summary.description;
      setWeatherInfo({
        cityName: cityName,
        temperature: temperature,
        summary: summary,
      });
    }
  }, [data]);

  console.log(weatherInfo);
  return (
    <div className="home">
      <h1>Search For Weather</h1>
      <input
        type="text"
        placeholder="Country Name..."
        onChange={(event) => {
          setCitySearch(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="City Name..."
        onChange={(event) => {
          setCitySearch(event.target.value);
        }}
      />
      <button onClick={() => getWeather()}>Search</button>
      {data && (
        <>
          <div className="weather">
            <h1>{weatherInfo.cityName}</h1>
            <span>{weatherInfo.temperature}</span>
            <p>{weatherInfo.summary}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
