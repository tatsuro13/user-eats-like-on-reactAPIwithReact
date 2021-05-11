import React, { useEffect, useReducer } from 'react';
import { fetchLineFoods } from '../apis/line_foods';

// reducers
import {
  initialState,
  lineFoodsActionTyps,
  lineFoodsReducer,
} from '../reducers/lineFoods';

export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  useEffect(() => {
    dispatch({ type: lineFoodsActionTyps.FETCHING });
    fetchLineFoods()
      .then((data) =>
        dispatch({
          type: lineFoodsActionTyps.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data,
          },
        })
      )
      .catch((e) => console.error(e));
  }, []);
  return <>注文画面</>;
};
