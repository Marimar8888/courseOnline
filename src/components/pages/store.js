import React from 'react';

import StoreContainer from '../store/store-container';

const Store = (props) => {
    return (
        <StoreContainer {...props} />
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


