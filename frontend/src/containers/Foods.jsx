import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { COLORS } from '../style_constants';

// components
import { LocalMallIcon } from '../components/Icons';
// icons

import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@material-ui/lab/Skeleton';

import { FoodOrderDialog } from '../components/FoodOrderDialog';

import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

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

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const submitOrder = () => {
  console.log('登録ボタンが押されました★');
};

export const Foods = ({ match }) => {
  const [foodState, dispatch] = useReducer(foodsReducer, foodinitialState);

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  };
  const [state, setState] = useState(initialState);

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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodState.foodState === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </>
        ) : (
          foodState.foodList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          // 先ほど作った関数を渡します
          onClickOrder={() => submitOrder()}
          // モーダルを閉じる時はすべてのstateを初期化する
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })
          }
        />
      )}
    </>
  );
};
