import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodList: [],
};

export const foodActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodList: action.payload.foods,
      };
    default:
      throw new Error();
  }
};
