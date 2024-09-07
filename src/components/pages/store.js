import React from 'react';

import StoreContainer from '../store/store-container';

const Store = (props) => {
    return (
      <div className="store-page-wrapper">
        <StoreContainer {...props} />
      </div>
    );
};

export default Store;



