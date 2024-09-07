import React from 'react';

import StoreContainer from '../store/store-container';

const Store = (props) => {
    return (
      <div >
        <StoreContainer {...props} />
      </div>
    );
};

export default Store;



