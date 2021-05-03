import React, {useEffect, useReducer} from 'react';
import styled from 'styled-components';

// apis
import {fetchRestaurants} from '../apis/restaurants';

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from '../reducers/restaurants.js';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';

const HeaderWrapper = styled.div`
  display:flex;
  justify-content:flex-start;
  padding:8px 32px;
`;

const MainLogoImage = styled.img`
  height:90px;
`;

const MainCoverImageWpper = styled.div`
  text-align:center;
`;

const MainCover = styled.img`
  height:600px;
`

export const Restaurants = () => {

  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({type: restaurantsActionTypes.FETCHING});
    fetchRestaurants()
    .then((data) =>
    dispatch({
      type:restaurantsActionTypes.FETCH_SUCCESS,
      payload:{
        restaurants: data.restaurants
      }
    })
    )
  }, [])
    return(
        <>
        <HeaderWrapper>
          <MainLogoImage src={MainLogo} alt="main logo" />
        </HeaderWrapper>
        <MainCoverImageWpper>
          <MainCover src={MainCoverImage} alt="main cover" />
        </MainCoverImageWpper>
        {
          state.restaurantsList.map(restaurant => 
            <div key={restaurant.id}>
              {restaurant.name}
            </div>
          )
        }
        </>
    )
}