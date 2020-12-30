export default 1


/*
// import {InitialStateType} from './SearchWeatherReducer';
// import {ForecastResponseDataType, WeatherResponseDataType} from '../services/types';
// import {AppStateType, InferActionTypes} from './store';
// import {ThunkAction, ThunkDispatch} from 'redux-thunk';
// import {weatherApi} from '../api/api';
//
// let initialState = {
//    selectedCityArray: []
// }


// export const searchWeatherReducer = (state: InitialStateType = initialState, action: ActionType) => {
//     switch (action.type) {
//         case SET_SEARCH_INPUT:
//             return {...state, dataArray: action.dataArray}
//
//
//         default:
//             return state
//     }
// }

// type ActionType = InferActionTypes<typeof actions>;
// type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

// const actions = {
//     setSearchInput: (dataArray: WeatherResponseDataType) => {
//         return ({type: SET_SEARCH_INPUT, dataArray} as const)
//     },
//     setSearchWeaklyForecast: (forecastData: ForecastResponseDataType) => {
//         debugger
//         return ({type: SET_SEARCH_WEAKLY_FORECAST, forecastData} as const)
//     },
// }
//
// export const addSelectedCityThunk = (searchValue: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
//     try {
//         const response = await weatherApi.setSearchCityWeather(searchValue)
//
//         dispatch(actions.setSearchInput(response.data))
//     } catch (e) {
//
//     }
// }
*/
