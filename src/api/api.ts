import axios from 'axios';
import {ForecastResponseDataType, WeatherResponseDataType} from '../services/types';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const weatherApi = {
    setSearchCityWeather(searchValue: string) {
        debugger
        let a  =  process.env.REACT_APP_API_KEY;

        return instance.get<WeatherResponseDataType>(`weather?q=${searchValue}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    },
    setSearchCityWeatherByGeolocation(latitude: number, longitude: number) {
        return instance.get<WeatherResponseDataType>(`weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    },
    setSearchWeaklyForecast(searchValue: string) {
        return instance.get<ForecastResponseDataType>(`forecast?q=${searchValue}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    }
}
