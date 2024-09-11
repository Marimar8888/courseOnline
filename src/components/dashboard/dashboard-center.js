import React from 'react';

import CenterCreateContainer from '../centers/center-create-container';
import CentersEditContainer from '../centers/centers-edit-container';

const DashboardCenter = ({ centersData, updateCentersData, userId, showCenterContainer, handleCenterCreated}) => {
  
  const updateDashboarCentersData = (centerId) =>{
    updateCentersData(centerId)
  }
  
  return showCenterContainer ? (
    <CenterCreateContainer 
      userId={userId} 
      handleCenterCreated={handleCenterCreated}
    />
  ) : (
    <CentersEditContainer 
      centersData={centersData} 
      updateDashboarCentersData={updateDashboarCentersData}  
    />
  );
};

export default DashboardCenter;