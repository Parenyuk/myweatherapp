import axios from 'axios';
import {ForecastResponseDataType, WeatherResponseDataType} from '../services/types';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

const apiKey = '56d2e4b5dd3e4cbde0947dae77ea7da0';

export const weatherApi = {
    setSearchCityWeather(searchValue: string) {
        return instance.get<WeatherResponseDataType>(`weather?q=${searchValue}&appid=${apiKey}&units=metric`)
    },
    setSearchCityWeatherByGeolocation(latitude: number, longitude: number) {
        return instance.get<WeatherResponseDataType>(`weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    },
    setSearchWeaklyForecast(searchValue: string) {
        return instance.get<ForecastResponseDataType>(`forecast?q=${searchValue}&appid=${apiKey}&units=metric`)
    }
}
