import React, { useState } from 'react';
import  axios  from 'axios';
import WeatherData from './WeatherData';

// Use the interface for type safety in WeatherDash
interface WeatherDataType {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}

const WeatherDash = () => {
    const [data, setData] = useState<WeatherDataType | null>(null);
    const [location, setLocation] = useState<string>("");
    const [error, setError] = useState<string>("");
    const API_KEY = `e6844baa4281211db8a8a79a777c2421`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    
    const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
           axios.get(url)
            .then((response) => {
                setData(response.data)
                setError("")
                console.log(response.data)
            })
            .catch(() => setError("Location not found"));
            setLocation("")
        }
    }

    return (
    <div className=''>
        {/* Header */}
        <div>
            <h1 className='text-center text-3xl'>
                Weather 
            </h1>
        </div>

             {/* Search Bar */}
            <div className='w-full h-full relative'>
                <div className='text-center p-4'>
                    <input type="text" 
                        placeholder="Enter location" 
                        className='py-3 px-6 w-[700px] text-lg rounded-3xl border border-gray-300 text-gray-600 placeholder:text-gray-600 focus:outline-none shadow-md'
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        onKeyDownCapture={searchLocation}>
                    </input>
                </div>
                {error && <p className="text-center text-red-500">{error}</p>}
            </div>

            {/* Weather Results */}
            {data && <WeatherData weatherData={data} />}
    </div>
  )
}

export default WeatherDash