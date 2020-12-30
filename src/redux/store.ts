import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { searchWeatherReducer } from "./SearchWeatherReducer";
import {WeatherResponseDataType} from '../services/types';




export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


const rootReducer = combineReducers(
    {
       searchWeatherPage: searchWeatherReducer

    }
)
export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

 export type SearchWeatherReducerType = ReturnType<typeof searchWeatherReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk));
