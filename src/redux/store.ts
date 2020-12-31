import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {searchWeatherReducer} from './SearchWeatherReducer';
import {selectedCityReducer} from './SelectedCityReducer';


export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


const rootReducer = combineReducers(
    {
        searchWeatherPage: searchWeatherReducer,
        selectedCityPage: selectedCityReducer
    }
)
export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
