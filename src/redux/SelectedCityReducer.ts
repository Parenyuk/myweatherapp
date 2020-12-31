import {AppStateType, InferActionTypes} from './store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

const SET_SELECTED_CITIES = 'SEARCH_CITY_REDUCER/SET_SELECTED_CITIES';

let initialState = {
    selectedCitiesArray: [] as Array<string>
}

type InitialStateType = typeof initialState;

export const selectedCityReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_SELECTED_CITIES:
            return {
                ...state, selectedCitiesArray: [...state.selectedCitiesArray, action.cityName + ' ']
            }

        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

const actions = {
    setSelectedCity: (cityName: string) => {
        return ({type: SET_SELECTED_CITIES, cityName} as const)
    },

}

export const addSelectedCityTC = (searchValue: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    try {
        dispatch(actions.setSelectedCity(searchValue))
    } catch (e) {
        throw new Error(e)
    }
}

