import React from 'react';

import CenterEditCreateContainer from '../centers/center-edit-create-container';
import CentersEditContainer from '../centers/centers-edit-container';

const DashboardCenter = ({ centersData, updateCentersData, userId, showCenterContainer, handleCenterCreated, handleEditCenter, centerToEdit, handleBack}) => {
  
  const updateDashboarCentersData = (centerId) =>{
    updateCentersData(centerId)
  }
  
  return showCenterContainer ? (
    <CenterEditCreateContainer 
      userId={userId} 
      handleCenterCreated={handleCenterCreated}
      handleEditCenter={handleEditCenter}
      centerToEdit={centerToEdit}
      handleBack={handleBack}/>
  ) : (
    <CentersEditContainer 
      centersData={centersData} 
      updateDashboarCentersData={updateDashboarCentersData}  
    />
  );
};

export default DashboardCenter;