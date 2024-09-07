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


// export default function () {
//   return (
//     <div className="store-page-wrapper">
//       <StoreContainer/>
//     </div>
//   )
// }


