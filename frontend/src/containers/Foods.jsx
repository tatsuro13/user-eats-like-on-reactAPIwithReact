import React from 'react';

export const Foods = ({match}) => {
    return(
        <>
          フード一覧
          <p>レストランIDは{match.params.restaurantsId}です</p>
        </>
    )
}