import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const WeatherWidget = () => {
    const location = useSelector(state => state.tasks.location);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (location) {
            const fetchWeather = async () => {
                try {
                    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
                        params: {
                            key: '2057314273d6488a815180822241309', 
                            q: location
                        }
                    });
                    setWeather(response.data.current);
                } catch (error) {
                    setError('Unable to fetch weather data');
                }
            };
            fetchWeather();
        }
    }, [location]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {weather ? (
                <div>
                    <p>Temperature: {weather.temp_c}°C</p>
                    <p>Condition: {weather.condition.text}</p>
                    <p>Wind Speed: {weather.wind_kph} km/h</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
};

export default WeatherWidget;
