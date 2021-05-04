import React, { useEffect, useReducer } from 'react';

// reducers
import {
  initialState as foodinitialState,
  foodActionTypes,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// contants
import { REQUEST_STATE } from '../constants.js';

export const Foods = ({ match }) => {
  const [foodState, dispatch] = useReducer(foodsReducer, foodinitialState);
  useEffect(() => {
    dispatch({ type: foodActionTypes.FETCHING });
    fetchFoods(match.params.restaurantsId).then((data) => {
      dispatch({
        type: foodActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {foodState.foodState === REQUEST_STATE.LOADING ? (
        <>
          <p>ロード中</p>
        </>
      ) : (
        foodState.foodList.map((food) => <div key={food.id}>{food.name}</div>)
      )}
    </>
  );
};
