import {AppStateType, InferActionTypes} from './store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {weatherApi} from '../api/api';
import {ForecastResponseDataType, WeatherResponseDataType} from '../services/types';


const SET_SEARCH_INPUT = 'SEARCH_WEATHER_REDUCER/SET_SEARCH_INPUT';
const SET_SEARCH_WEAKLY_FORECAST = 'SEARCH_WEATHER_REDUCER/SET_SEARCH_WEAKLY_FORECAST';

let initialState = {
    dataArray: {} as WeatherResponseDataType,
    forecastData: {} as ForecastResponseDataType
}

export type InitialStateType = typeof initialState;

export const searchWeatherReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_SEARCH_INPUT:
            return {...state, dataArray: action.dataArray}
        case SET_SEARCH_WEAKLY_FORECAST:
            return {...state, forecastData: action.forecastData}

        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

const actions = {
    setSearchInput: (dataArray: WeatherResponseDataType) => {
        return ({type: SET_SEARCH_INPUT, dataArray} as const)
    },
    setSearchWeaklyForecast: (forecastData: ForecastResponseDataType) => {
        return ({type: SET_SEARCH_WEAKLY_FORECAST, forecastData} as const)
    },
}

export const searchInputTC = (searchValue: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    try {
        const response = await weatherApi.setSearchCityWeather(searchValue)
        dispatch(actions.setSearchInput(response.data))
    } catch (e) {
        throw new Error(e)
    }
}

export const searchWeatherDataGeolocationTC = (latitude: number, longitude: number): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    try {
        const response = await weatherApi.setSearchCityWeatherByGeolocation(latitude, longitude)
        // debugger
        dispatch(actions.setSearchInput(response.data))
    } catch (e) {
        throw new Error(e)
    }
}

export const searchWeaklyForecastTC = (searchValue: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    try {
        const response = await weatherApi.setSearchWeaklyForecast(searchValue)
        debugger

        dispatch(actions.setSearchWeaklyForecast(response.data))
    } catch (e) {
        throw new Error(e)
    }
}
